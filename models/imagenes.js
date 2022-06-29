import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Imagen = sequelize.define(
  "imagenes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
    },
    alt: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
