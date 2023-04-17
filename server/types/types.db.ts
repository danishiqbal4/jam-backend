import { Dialect, Sequelize, Op } from "sequelize";

export interface DB {
    Sequelize: typeof Sequelize;
    sequelize: Sequelize;
    user: any;
    role: any;
    roles: Array<string>;
    Op: typeof Op;
}

export interface DbConfig {
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