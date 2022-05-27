import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Salud = sequelize.define("salud", {
    id_salud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    peso: {
        type: DataTypes.INTEGER,
    },
});
