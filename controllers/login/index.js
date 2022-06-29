//here go the imports
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";

import { SECRET } from "../../utils/config.js";

// import user model
import { User } from "../../models/users.js";

// creates the router
export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  try {
    const { correo, password } = req.body;
    if (!correo || !password)
      return res.status(401).json({ error: "rut or password missing" });
    const user = await User.findOne({ where: { correo } });

    if (!user)
      return res.status(401).json({ error: "invalid rut or password" });

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match)
      return res.status(401).json({ error: "invalid rut or password" });

    const token = jwt.sign({ rut: user.rut, id: user.id }, SECRET);

    res.status(200).send({ token, nombre: user.nombre, id: user.id });
  } catch (error) {
    console.error(error);
  }
});
