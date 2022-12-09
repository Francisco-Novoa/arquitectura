import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const TipoUsuario = sequelize.define(
  "tipo_usuario",
  {
    nombre: {
        type: DataTypes.STRING,
        primaryKey: true,

    }
  },
  {
    freezeTableName: true,
  }
);
