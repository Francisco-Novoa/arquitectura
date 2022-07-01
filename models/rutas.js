import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Ruta = sequelize.define(
  "rutas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    dificultad: {
      type: DataTypes.INTEGER,
    },
    duracion: {
      type: DataTypes.INTEGER,
    },
    ubicacion: {
      type: DataTypes.STRING,
    },
    comentario: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
