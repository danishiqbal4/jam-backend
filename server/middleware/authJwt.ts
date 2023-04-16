import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import config from "../config/auth.config";
import db from "../models";

interface IUserId extends Request {
    userId: number;
}

interface IJWTPayload {
    id: number;
}

const User = db.user;

const verifyToken = (req:Request, res:Response, next:NextFunction) => {
    let token = (req.headers["x-access-token"] || req.headers['x-access-token']) as string;

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }

        // const payload = decoded as IJWTPayload;

        (req as IUserId).userId = (decoded as IJWTPayload).id;
        next();
    });
};

const isAdmin = async (req:Request, res:Response, next:NextFunction) => {
    const user = await User.findByPk((req as IUserId).userId);

    if(user) {
        const roles = await user.getRoles();

        if(roles) {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        }
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
};

export default authJwt;