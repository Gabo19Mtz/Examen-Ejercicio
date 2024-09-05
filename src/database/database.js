import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "autos-inventorio",
  "postgres",
  "gabo191203",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
