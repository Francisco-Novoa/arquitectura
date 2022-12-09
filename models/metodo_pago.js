import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const MetodoPago = sequelize.define(
  "metodo_pago",
  {
    nombre: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
  }
);
