import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Inscritos = sequelize.define("inscritos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.STRING,
  },
  fecha: {
    type: DataTypes.DATE
  },
  estado_pago: {
    type: DataTypes.STRING
  },
  tipo_pago: {
    type: DataTypes.STRING
  },
  estado: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true
});
// Como hago la foreign Key para el id usuario