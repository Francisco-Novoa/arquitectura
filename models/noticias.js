import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Noticia = sequelize.define("noticias", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    encabezado: {
        type: DataTypes.STRING,
    },
    cuerpo: {
        type: DataTypes.STRING,
    },
    prioridad: {
        type: DataTypes.ENUM("Baja", "Media", "Alta", "Urgente"),
    },
});


