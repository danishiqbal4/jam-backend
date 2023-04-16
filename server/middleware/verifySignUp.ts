import { NextFunction, Request, Response } from 'express';
import db from "../models";

const ROLES = db.roles!;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req:Request, res:Response, next:NextFunction) => {

    let user = await User.findOne({
        where: {
            username: req.body.username.toLowerCase()
        }
    });

    if (user) {
        res.status(400).send({
            message: "Failed! Username is already in use!"
        });
        return;
    }

    user = await User.findOne({
        where: {
            email: req.body.email.toLowerCase()
        }
    });

    if (user) {
        res.status(400).send({
            message: "Failed! Email is already in use!"
        });
        return;
    }

    next();
};

const checkRolesExisted = (req:Request, res:Response, next:NextFunction) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

export default verifySignUp;