import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const MovCuentaCorriente = sequelize.define(
  "mov_cuenta_corriente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hora: {
      type: DataTypes.DATE,
    },
    monto: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);
