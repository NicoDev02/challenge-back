import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, VERCEL_HOST } = process.env;
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//   {
//     logging: false,
//     dialect: "postgres",
//   }
// );

const sequelize = new Sequelize(VERCEL_HOST || "", {
  logging: false,
  dialect: "postgres",
});
export { sequelize };
