import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const EstadoPedido = sequelize.define(
  "estado_pedido",
  {
    nombre: {
      type: DataTypes.STRING,
      primaryKey: true
    },
  },
  {
    freezeTableName: true,
  }
);
