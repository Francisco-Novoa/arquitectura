import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Pago = sequelize.define(
  "pago",
  {
    nroBoleta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    monto: {
        type: DataTypes.INTEGER,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    iva: {
        type: DataTypes.INTEGER,
    },
    descuento: {
        type: DataTypes.INTEGER,
    }
  },
  {
    freezeTableName: true,
  }
);
