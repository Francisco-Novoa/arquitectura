import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Ruta = sequelize.define("actividad", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING
  },
  descripcion: {
    type: DataTypes.STRING
  },
  dificultad: {
    type: DataTypes.INTEGER
  },
  tiempo: {
    type: DataTypes.INTEGER
  },
  imagen: {
    type: DataTypes.STRING
  },
  ubicacion: {
    type: DataTypes.BOOLEAN
  }
}, {
  freezeTableName: true
});
