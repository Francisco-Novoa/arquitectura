import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Destino = sequelize.define(
  "destino",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.INTEGER,
    },
    long: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);
