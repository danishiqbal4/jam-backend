import { Express } from 'express';
import { NextFunction, Request, Response } from 'express';
import { verifySignUp } from "../middleware";
import controller from "../controllers/auth.controller";

export default (app: Express) => {
    app.use((req:Request, res:Response, next:NextFunction) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);
};