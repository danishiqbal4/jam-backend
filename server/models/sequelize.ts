import { Sequelize } from "sequelize";
import DbConfig from "../config/db.config";

const sequelize = new Sequelize(
    DbConfig.DB,
    DbConfig.USER,
    DbConfig.PASSWORD,
    {
        host: DbConfig.HOST,
        dialect: DbConfig.dialect,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        // operatorsAliases: false,
        pool: {
            max: DbConfig.pool.max,
            min: DbConfig.pool.min,
            acquire: DbConfig.pool.acquire,
            idle: DbConfig.pool.idle
        }
    }
);

export default sequelize;