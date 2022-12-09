import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const ItemPedido = sequelize.define(
  "item_pedido",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    montoAhorrado: {
      type: DataTypes.INTEGER,
    },
    cantidad: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);
