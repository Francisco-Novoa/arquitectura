import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Producto = sequelize.define(
  "producto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
    },
    descripcion: {
        type: DataTypes.STRING,
    },
    foto: {
        type: DataTypes.STRING,
    },
    precio: {
        type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);
