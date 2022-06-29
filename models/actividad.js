import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Actividad = sequelize.define(
  "actividad",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hora: {
      type: DataTypes.DATE,
      comment: "aca se guarda la hora donde se realizara la actividad",
    },
    fecha: {
      type: DataTypes.DATE,
    },
    cupo: {
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    cupo_traslado: {
      type: DataTypes.INTEGER,
    },
    precio: {
      type: DataTypes.INTEGER,
    },
    estado: {
      type: DataTypes.ENUM("creada", "activa", "cancelada", "terminada"),
      defaultValue: "creada",
    },
  },
  {
    freezeTableName: true,
  }
);
