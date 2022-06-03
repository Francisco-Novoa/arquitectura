import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Actividad = sequelize.define("actividad", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  hora: {
    type: DataTypes.INTEGER,
  },
  fecha: {
    type: DataTypes.DATE
  },
  cupo: {
    type: DataTypes.INTEGER
  },
  cupo_traslado: {
    type: DataTypes.STRING
  },
  precio: {
    type: DataTypes.INTEGER
  },
  estado: {
    type: DataTypes.BOOLEAN
  }
}, {
  freezeTableName: true
});
// Como hago la foreign Key para el id RUTAS