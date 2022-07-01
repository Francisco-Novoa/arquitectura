import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import Sequelize from "sequelize";

export const Mensajeria = sequelize.define(
  "mensajeria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
    },
    cuerpo: {
      type: DataTypes.STRING,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    estado: {
      type: DataTypes.ENUM("enviado", "recibido"),
      defaultValue: "enviado",
    },
  },
  {
    freezeTableName: true,
  }
);
