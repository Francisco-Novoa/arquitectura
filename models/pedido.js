import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/database.js";

export const Pedido = sequelize.define(
  "pedido",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total: {
        type: DataTypes.INTEGER,
    },
    precioEnvio: {
        type: DataTypes.INTEGER,
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    iva: {
        type: DataTypes.INTEGER,
    },
    comision: {
        type: DataTypes.INTEGER,
    },
    propina: {
        type: DataTypes.INTEGER,
    },
    subtotal: {
      type: DataTypes.INTEGER,
    }
  },
  {
    freezeTableName: true,
  }
);
