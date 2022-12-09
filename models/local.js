import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Local = sequelize.define(
  "local",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    direccion: {
        type: DataTypes.STRING,
      },
    logo: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
