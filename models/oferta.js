import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Oferta = sequelize.define(
  "oferta",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    fechaInicio: {
        type: DataTypes.DATE,
    },
    fechaTermino: {
        type: DataTypes.DATE,
    },
    descuento: {
        type: DataTypes.INTEGER,
    }
  },
  {
    freezeTableName: true,
  }
);
