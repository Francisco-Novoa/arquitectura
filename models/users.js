import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const User = sequelize.define(
  "usuarios",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      comment: "aca se guarda encriptada la password usando bcrypt",
    },
    rut: {
      type: DataTypes.STRING,
      unique: true,
    },
    correo: {
      type: DataTypes.STRING,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
    },
    genero: {
      type: DataTypes.STRING,
    },
    fono: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    fono_emergencia: {
      type: DataTypes.STRING,
    },
    nombre_emergencia: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.ENUM("invalido", "valido", "baneado", "eliminado"),
      defaultValue: "invalido",
    },
    derivar_a: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
