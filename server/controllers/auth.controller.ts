import { Request, Response } from 'express';
import db from "../models/";
import config from "../config/auth.config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const User = db.user;
const Role = db.role;
const Op = db.Op;

interface Role {
    name: string;
}

interface User {
    username: string;
    email: string;
    password: string;
    id: number;
    getRoles: () => Promise<Array<Role>>;
    setRoles: (setNewRole: Array<number>) => Promise<void>;
}

const signup = async (req: Request, res: Response) => {
    try {
        const user: User = await User.create({
            username: req.body.username.trim().toLowerCase(),
            email: req.body.email.trim().toLowerCase(),
            password: bcrypt.hashSync(req.body.password.trim(), 8)
        });
    
        if (!user) {
            return res.status(404).send({ message: "User registration failed." });
        }

        let setNewRole: Array<number> = [];
        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            });

            if(roles) {
                setNewRole = roles;
            }
        } else {
            setNewRole = [1];
        }

        const setRoles = await user.setRoles(setNewRole);

        res.send({ message: "User was registered successfully!" });
    } catch (err: any) {
        res.status(500).send({ message: err.message });
    }
};

const signin = async (req: Request, res: Response) => {
    let user: User;

    try {
        user = await User.findOne({
            where: {
                username: req.body.username.trim().toLowerCase(),
            }
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password.trim(),
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        const authorities: Array<string> = [];

        const roles = await user.getRoles();
        
        if(roles) {
            for (let i = 0; i < roles.length; i++) {
                authorities.push(`ROLE_${roles[i].name.toUpperCase()}`);
            }

            return res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        } else {
            return res.status(500).send({ message: "Unable to get roles of the user" });
        }
    } catch (err: any) {
        return res.status(500).send({ message: err.message });
    }
};

export default {
    signup,
    signin
};
