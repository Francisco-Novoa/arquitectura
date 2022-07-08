//here go the imports
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import sequelize from "../../database/database.js";

import { SECRET } from "../../utils/config.js";

// creates the router
export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { correo, password } = req.body;
  if (!correo || !password)
    return res.status(401).json({ error: "correo or password missing" });
  const [user, metadata] = await sequelize.query(
    `select u.id, u."passwordHash", u.rut, 
        u.nombre, p.tipo as "perfil"  
      from usuarios u 
        join perfiles p on p.id = u."perfileId"
        where u.correo = '${correo}'`
  );

  if (!user[0])
    return res.status(401).json({ error: "invalid correo or password" });

  const match = await bcrypt.compare(password, user[0].passwordHash);

  if (!match)
    return res.status(401).json({ error: "invalid correo or password" });

  const token = jwt.sign({ rut: user[0].rut, id: user[0].id }, SECRET);

  console.log(user[0]);
  return res.status(200).send({
    token,
    nombre: user[0].nombre,
    id: user[0].id,
    perfil: user[0].perfil,
  });
});
