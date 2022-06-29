import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Inscripcion = sequelize.define(
  "inscripcion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
    },
    fecha: {
      type: DataTypes.DATE,
    },
    estado_pago: {
      type: DataTypes.STRING,
    },
    tipo_pago: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.STRING,
    },
    tipo_usuario: {
      type: DataTypes.ENUM("Cliente", "Instructor", "Ayudante"),
    },
  },
  {
    freezeTableName: true,
  }
);
