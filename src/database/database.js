import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "gestion-laboratorio",
  "postgres",
  "gabo191203",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
