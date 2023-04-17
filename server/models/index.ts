import { Sequelize, Op } from "sequelize";
import user from "./user.model";
import role from "./role.model";
import { IDB } from "../types/types.db";
import sequelize from "./sequelize";
import ProductModal from "./product.model";

const db: IDB = {
    Sequelize,
    sequelize,
    user: user(sequelize, Sequelize),
    role: role(sequelize, Sequelize),
    product: ProductModal,
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