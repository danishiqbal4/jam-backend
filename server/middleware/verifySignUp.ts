import { NextFunction, Request, Response } from 'express';
import db from "../models";

const ROLES = db.roles!;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req:Request, res:Response, next:NextFunction) => {
    let username = "";
    let email = "";
    let password = "";

    try {
        username = req.body.username.trim().toLowerCase();
        email = req.body.email.trim().toLowerCase();
        password = req.body.password.trim();

        if(username == "" || email == "" || password == "") {
            return res.status(422).send({
                message: "Please specify Username, Email and Password fields."
            });
        }
    } catch (err: any) {
        console.log(err.message)

        return res.status(422).send({
            message: "Please enter username, email and password correctly."
        });
    }
    
    try {
        let user = await User.findOne({
            where: {
                username
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
                email
            }
        });
    
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
    } catch (err: any) {
        console.log(err.message)

        return res.status(500).send({
            message: "Something went wrong."
        });
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