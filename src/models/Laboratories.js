import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Computers } from "./Computers.js";

export const Laboratories = sequelize.define(
  "laboratories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Laboratories.hasMany(Computers, {
  foreignKey: "laboratoriesId",
  sourceKey: "id",
});
Computers.belongsTo(Laboratories, {
  foreignKey: "laboratoriesId",
  targetKey: "id",
});
