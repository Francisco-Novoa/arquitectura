import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Menu = sequelize.define("menu", {
  id_menu: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
}, {
  freezeTableName: true
});
