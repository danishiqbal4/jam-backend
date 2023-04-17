import { Express } from 'express';
import { NextFunction, Request, Response } from 'express';
import { authJwt } from "../middleware";
import productController from "../controllers/product.controller";

export default (app: Express) => {
    app.use((req:Request, res:Response, next:NextFunction) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/product/create",
        [authJwt.verifyToken, authJwt.isAdmin],
        productController.createProduct
    );

    app.get("/api/product/all", productController.getAllProducts);

    app.get("/api/product/:productId", productController.getProductById);
};