import { Request, Response } from "express";
import ProductModel from "../models/product.model";

const createProduct = async (req: Request, res: Response) => {
    try{
        const name = req.body.name.trim();
        const description = req.body.description;
        const price = req.body.price;
        const quantity = req.body.quantity;

        const product = await ProductModel.create({
            name,
            description,
            price,
            quantity,
        });

        if (!product) {
            return res.status(422).send({ message: "Could not add a product." });
        } else {
            return res.status(200).send({ message: `Product ${req.body.name} added successfully!` });
        }
    } catch (err: any) {
        console.log(err);
        res.status(500).send({ message: "Error adding a product." });
    }
}

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.findAndCountAll();

        return res.status(200).send({ 
            products: product
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error getting the product list." });
    }
}

const getProductById = async (req: Request, res: Response) => {
    const productId = req.params.productId;

    try {
        const product = await ProductModel.findOne({
            where: {
                id: productId,
            }
        });

        if(product) {
            return res.status(200).send({ 
                product
            });
        } else {
            return res.status(422).send({ 
                message: `Product with ID ${productId} does not exist.`
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: `Error getting the product with ID ${productId}` });
    }
}

export default {
    createProduct,
    getAllProducts,
    getProductById
}