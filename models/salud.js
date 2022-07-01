import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Salud = sequelize.define(
  "salud",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    peso: {
      type: DataTypes.INTEGER,
    },
    estatura: {
      type: DataTypes.INTEGER,
    },
    movilidad: {
      type: DataTypes.STRING,
    },
    presion: {
      type: DataTypes.STRING,
    },
    comentarios: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
