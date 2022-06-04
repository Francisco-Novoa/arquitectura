import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Banco = sequelize.define("banco", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING
    }

}, {
    freezeTableName: true
}
);