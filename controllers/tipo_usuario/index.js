import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import { SECRET } from "../../utils/config.js";
import { TipoUsuario } from "../../models/index.js";

export const tipoUsuarioRouter = express.Router();

tipoUsuarioRouter.post("/", async (req, res) => {
  const {
    nombre,
  } = req.body;

  const tipoUsuario = await TipoUsuario.create(
    {
        nombre,
    },
    { raw: true }
  );
  res.status(201).json({
    message: "tipo de usuario creado exitosamente",
    data: { tipoUsuario },
  });
});

