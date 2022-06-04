import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Cuenta_corriente = sequelize.define("cuenta_corriente", {
    nro_cuenta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  titular: { //nombre de la cuenta
    type: DataTypes.INTEGER,
    comment: 'Aqui se guardara el nombre del titular de la cuenta'
  },
  tipo_cuenta: {
      type: DataTypes.ENUM('Cuenta Corriente/Cuenta Vista','Cuenta Ahorro')
  },

}, { //options
    freezeTableName: true
}
);