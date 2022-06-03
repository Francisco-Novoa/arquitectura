import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Cuenta_corriente = sequelize.define("cuenta_corriente", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  monto: {
    type: DataTypes.INTEGER
  },
  mov_cuenta_corriente: {
      type: DataTypes.INTEGER
  },

}, { //options
    freezeTableName: true
}

);