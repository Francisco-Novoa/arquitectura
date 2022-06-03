import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Problema_Salud = sequelize.define('problema_salud', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})