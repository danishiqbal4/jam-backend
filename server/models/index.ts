import DbConfig from "../config/db.config";
import { Sequelize, Op } from "sequelize";
import user from "./user.model";
import role from "./role.model";
import { DB } from "../types/types.db";

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

const db: DB = {
    Sequelize,
    sequelize,
    user: user(sequelize, Sequelize),
    role: role(sequelize, Sequelize),
    roles: ["user", "admin"],
    Op
};

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

export default db;