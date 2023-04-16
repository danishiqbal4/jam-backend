import { Dialect } from "sequelize";

export interface DB {
    Sequelize?: any;
    sequelize?: any;
    user?: any;
    role?: any;
    roles?: Array<string>;
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