import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import { SECRET } from "../../utils/config.js";
import { Usuario } from "../../models/index.js";
export const usuarioRouter = express.Router();

usuarioRouter.post("/", async (req, res) => {
  const {
    password,
    correo,
    nombre,
    tipoUsuarioNombre,
  } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const usuario = await Usuario.create(
    {
        passwordHash,
        correo,
        nombre,
        tipoUsuarioNombre,
    },
    { raw: true }
  );
  const token = jwt.sign({ rut: usuario.correo, id: usuario.nombre }, SECRET);
  res.status(201).json({
    message: "usuario creado exitosamente",
    data: { token, id: usuario.id, correo: usuario.correo, nombre },
  });
});

