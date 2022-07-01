import express from "express";
import { Salud, User, Problema_Salud } from "../../models/index.js";

export const saludRouter = express.Router();

saludRouter.post("/", async (req, res) => {
  const { peso, estatura, movilidad, presion, comentarios } = req.body;
  const usuario = req.body.private.id;
  if (!(await User.findByPk(usuario)))
    return res.status(400).send({ message: "usuario no encontrado" });
  if (!peso) {
    return res
      .status(400)
      .send({ message: "no puede haber un usuario sin peso" });
  }
  if (!estatura)
    return res
      .status(400)
      .send({ message: "no puede haber un usuario sin estatura" });
  if (!presion)
    return res
      .status(400)
      .send({ message: "no puede haber un usuario sin presion" });
  const salud = await Salud.create({
    peso,
    estatura,
    movilidad,
    presion,
    comentarios,
    usuarioId: usuario,
  });
  res
    .status(201)
    .json({ message: "informe de salud creado exitosamente", data: { salud } });
});

saludRouter.get("/:id", async (req, res) => {
  const salud = await Salud.findByPk(req.params.id, {
    include: Problema_Salud,
  });
  if (!salud) return res.status(400).send({ message: "salud no encontrada" });
  res.status(200).json({
    message: "informe de salud obtenido exitosamente",
    data: { salud },
  });
});

saludRouter.delete("/:id", async (req, res) => {
  if (!(await Salud.findByPk(req.params.id)))
    return res.status(400).send({ message: "salud no encontrada" });
  await Salud.destroy({
    where: { id: req.params.id },
  });
  res.sendStatus(204);
});

saludRouter.put("/:id", async (req, res) => {
  const { peso, estatura, movilidad, presion, comentario } = req.body;
  const usuario = req.body.private.id;
  if (!(await User.findByPk(usuario)))
    return res.status(400).send({ message: "usuario no encontrado" });
  if (!(await Salud.findByPk(req.params.id)))
    return res.status(400).send({ message: "salud no encontrada" });
  if (!peso) {
    return res
      .status(400)
      .send({ message: "no puede haber un usuario sin peso" });
  }
  if (!estatura)
    return res
      .status(400)
      .send({ message: "no puede haber un usuario sin estatura" });
  if (!presion)
    return res
      .status(400)
      .send({ message: "no puede haber un usuario sin presion" });
  const salud = await Salud.update(
    { peso, estatura, movilidad, presion, comentario, usuarioId: usuario },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  res.status(200).json({
    message: "informe de salud modificada exitosamente",
    data: { salud },
  });
});
