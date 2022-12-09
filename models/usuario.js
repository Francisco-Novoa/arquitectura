import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Usuario = sequelize.define(
  "usuario",
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,

    },
    correo: {
      type: DataTypes.STRING,

    },
    passwordHash: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
  }
);
