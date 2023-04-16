import { Express } from 'express';
import { NextFunction, Request, Response } from 'express';
import { authJwt } from "../middleware";
import controller from "../controllers/user.controller";

export default (app: Express) => {
    app.use((req:Request, res:Response, next:NextFunction) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/all", controller.allAccess);

    app.get(
        "/api/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};