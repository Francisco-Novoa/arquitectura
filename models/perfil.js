import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Perfil = sequelize.define(
  "perfiles",
  {
    id_perfil: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
