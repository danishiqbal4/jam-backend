import { IDbConfig } from "../types/types.db";

const DbConfig: IDbConfig = {
    HOST: "ep-snowy-recipe-577928.ap-southeast-1.aws.neon.tech",
    USER: "danishiqbal4",
    PASSWORD: "dBEeNpf6bIZ4",
    DB: "jam",
    dialect: "postgres",
    // operatorsAliases: false,
    sslmode: "require",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export default DbConfig;