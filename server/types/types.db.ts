import { Dialect, Sequelize, Op } from "sequelize";
import ProductModal from "../models/product.model";

export interface IDB {
    Sequelize: typeof Sequelize;
    sequelize: Sequelize;
    user: any;
    role: any;
    product: typeof ProductModal;
    roles: Array<string>;
    Op: typeof Op;
}

export interface IDbConfig {
    HOST: string;
    USER: string;
    PASSWORD: string;
    DB: string;
    dialect: Dialect;
    // operatorsAliases: OperatorsAliases;
    sslmode: string,
    pool: {
        max: number;
        min: number;
        acquire: number;
        idle: number;
    }
}