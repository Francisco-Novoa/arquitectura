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
    estatura: {
        type: DataTypes.INTEGER,
        comment: "aca se guarda encriptada la password usando bcrypt",
    },
    movilidad :{
        type: DataTypes.BOOLEAN,
    },
    presion :{
        type: DataTypes.INTEGER,
    },
    comentarios :{
        type: DataTypes.STRING,
    }

});
