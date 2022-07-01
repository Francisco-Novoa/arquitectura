import express from "express";
import { Problema_Salud, Salud } from "../../models/index.js";

export const problema_saludRouter = express.Router();

problema_saludRouter.post("/", async (req, res) => {
  const { tipo, salud } = req.body;
  if (!(await Salud.findByPk(salud)))
    return res.status(200).send({ message: "salud no encontrada" });
  if (!tipo)
    return res
      .status(400)
      .send({ message: "el tipo de problema es muy corto" });
  const psalud = await Problema_Salud.create({ tipo, saludId: salud });
  return res.status(201).json({
    message: "problema salud creado exitosamente",
    data: { psalud },
  });
});

problema_saludRouter.get("/:id", async (req, res) => {
  const psalud = await Problema_Salud.findByPk(req.params.id);
  if (!psalud)
    return res.status(201).json({
      message: "problema de salud no encontrado",
    });
  return res.status(200).json({
    message: "problema de salud obtenido exitosamente",
    data: { psalud },
  });
});

problema_saludRouter.delete("/:id", async (req, res) => {
  if (!(await Problema_Salud.findByPk(req.params.id)))
    return res.status(201).json({
      message: "problema de salud no encontrado",
    });
  await Problema_Salud.destroy({
    where: { id: req.params.id },
  });
  res.sendStatus(204);
});

problema_saludRouter.put("/:id", async (req, res) => {
  const { tipo, salud } = req.body;
  if (!(await Problema_Salud.findByPk(req.params.id)))
    return res.status(201).json({
      message: "problema de salud no encontrado",
    });
  if (!(await Salud.findByPk(salud)))
    return res.status(200).send({ message: "salud no encontrada" });
  if (!tipo)
    return res
      .status(400)
      .send({ message: "el tipo de problema salud es muy corto" });
  const problema_salud = await Problema_Salud.update(
    { tipo, saludId: salud },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  res.status(200).json({
    message: "problema salud modificado exitosamente",
    data: { problema_salud },
  });
});
