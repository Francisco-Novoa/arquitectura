import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import { SECRET } from "../../utils/config.js";
import { User } from "../../models/index.js";
import { ValidaRut } from "../../utils/rutValidator.js";

export const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {
  const {
    password,
    correo,
    rut,
    nombre,
    fecha_nacimiento,
    fono,
    genero,
    direccion,
    fono_emergencia,
    nombre_emergencia,
    estado,
    derivar_a,
  } = req.body;
  if (!password || !correo)
    return res.status(400).send({ error: "Password o correo vacias" });
  if (!correo) return res.status(400).send({ error: "correo no encontrado" });
  if (password.length <= 6)
    return res.status(400).send({ error: "Contraseña recibida es muy corta" });
  if (!ValidaRut(rut))
    return res.status(400).send({ error: "Rut recibido es invalido" });
  if (!nombre)
    return res.status(400).send({ error: "Nombre no debe estar vacio" });
  if (!fono) return res.status(400).send({ error: "Fono no debe estar vacio" });
  if (!direccion)
    return res.status(400).send({ error: "Direccion no debe estar vacia" });
  // if (!fono_emergencia)
  //   return res
  //     .status(400)
  //     .send({ error: "Debes tener un numero de emergencias" });
  // if (!nombre_emergencia)
  //   return res
  //     .status(400)
  //     .send({ error: "Debes tener un contacto de emergencias" });
  // if (!derivar_a)
  //   return res
  //     .status(400)
  //     .send({ error: "Necesitamos un centro medico de derivacion" });
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = await User.create(
    {
      passwordHash,
      correo,
      rut,
      nombre,
      fecha_nacimiento,
      fono,
      genero,
      direccion,
      fono_emergencia,
      nombre_emergencia,
      estado,
      derivar_a,
    },
    { raw: true }
  );
  const token = jwt.sign({ rut: user.rut, id: user.id }, SECRET);
  res.status(201).json({
    message: "usuario creado exitosamente",
    data: { token, id: user.id, correo: user.correo, nombre },
  });
});

usersRouter.put("/cambiarpass", async (req, res) => {
  const { password, correo } = req.body;
  if (!password || !correo)
    return res.status(400).send({ error: "Password o correo no encontrado" });
  const user = await User.findOne({
    where: { correo },
    raw: true,
  });
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const cambiada = await User.update(
    { passwordHash },
    {
      where: {
        id: user.id,
      },
      returning: true,
      raw: true,
    }
  );
  const cleaned = cambiada.flat()[1];
  delete cleaned.passwordHash;
  res.status(201).json({
    message: "password cambiada exitosamente",
    data: { user: cleaned },
  });
});

usersRouter.put("/:id", async (req, res) => {
  const {
    correo,
    rut,
    nombre,
    fecha_nacimiento,
    fono,
    genero,
    direccion,
    fono_emergencia,
    nombre_emergencia,
    estado,
    derivar_a,
  } = req.body;
  const id = req.params.id;
  if (!(await User.findByPk(id)))
    return res.status(400).send({ error: "Usuario no encontrado" });
  if (!correo) return res.status(400).send({ error: "correo no encontrado" });
  if (!ValidaRut(rut))
    return res.status(400).send({ error: "Rut recibido es invalido" });
  if (!nombre)
    return res.status(400).send({ error: "Nombre no debe estar vacio" });
  if (!fono) return res.status(400).send({ error: "Fono no debe estar vacio" });
  if (!direccion)
    return res.status(400).send({ error: "Direccion no debe estar vacia" });
  if (!fono_emergencia)
    return res
      .status(400)
      .send({ error: "Debes tener un numero de emergencias" });
  if (!nombre_emergencia)
    return res
      .status(400)
      .send({ error: "Debes tener un contacto de emergencias" });
  if (!derivar_a)
    return res
      .status(400)
      .send({ error: "Necesitamos un centro medico de derivacion" });
  const user = await User.update(
    {
      correo,
      rut,
      nombre,
      fecha_nacimiento,
      fono,
      genero,
      direccion,
      fono_emergencia,
      nombre_emergencia,
      estado,
      derivar_a,
    },
    {
      where: {
        id,
      },
      returning: true,
      raw: true,
    }
  );
  const cleaned = user.flat()[1];
  delete cleaned.passwordHash;
  res.status(201).json({
    message: "usuario modificado exitosamente",
    data: { user: cleaned },
  });
});

usersRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!(await User.findByPk(id)))
    return res.status(400).send({ error: "Usuario no encontrado" });

  await User.update(
    { estado: "eliminado" },
    {
      where: {
        id,
      },
    }
  );
  res.sendStatus(204);
});

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id, {
    raw: true,
  });
  if (!user) return res.status(400).send({ error: "Usuario no encontrado" });
  delete user.passwordHash;
  res.status(200).json({
    message: "usuario obtenido exitosamente",
    data: { user },
  });
});

usersRouter.get("/", async (req, res) => {
  const user = await User.findAll({raw:true});
  user.map( (usuario)=> {
    delete usuario.passwordHash;
  }) 
  res.status(200).json({
    message: "usuario obtenido exitosamente",
    data: { user },
  });
});

