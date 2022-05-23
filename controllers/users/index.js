import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import { SECRET } from "../../utils/config.js";
import { User } from "../../models/index.js";

export const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {
  const { password, rut } = req.body;
  if (!password || !rut)
    return res.status(400).send({ error: "password or rut missing" });
  if (password.length <= 6)
    return res.status(400).send({ error: "password length is too short" });
  if (rut.length <= 6)
    return res.status(400).send({ error: "rut length is invalid" });
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = await User.create({ rut, passwordHash });

  const token = jwt.sign({ rut: user.rut, id: user._id }, SECRET);

  res.status(201).json({
    token,
    message: "usuario creado exitosamente",
    data: { user: user.username, id: user.id },
  });
});
