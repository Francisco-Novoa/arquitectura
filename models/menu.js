import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Menu = sequelize.define(
  "menu",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
