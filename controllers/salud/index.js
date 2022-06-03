import express from "express";
import { Salud } from "../../models/index.js";

export const saludRouter = express.Router();

saludRouter.post("/", async (req, res) => {
  const { peso, estatura, movilidad, presion, comentario } = req.body;
  if (!peso) {
    return res.status(400).send({ message: "no puede haber un usuario sin peso" })
  }
  if (!estatura)
    return res.status(400).send({ message: "no puede haber un usuario sin estatura" });
  if (!presion)
    return res.status(400).send({ message: "no puede haber un usuario sin presion" });
  const salud = await Salud.create({ peso, estatura, movilidad, presion, comentario });
  res.status(201).json({ message: "informe de salud creado exitosamente", data: { salud } });
});

saludRouter.get("/:id", async (req, res) => { //hay q validar permisos
  const salud = await Salud.findByPk(req.params.id);
  res
    .status(200)
    .json({ message: "informe de salud obtenido exitosamente", data: { salud } });
});

saludRouter.delete("/:id", async (req, res) => {
  await Salud.destroy({
    where: { id: req.params.id },
  });
  res.status(204);
});

saludRouter.put("/:id", async (req, res) => {
  const { peso, estatura, movilidad, presion, comentario } = req.body;
  if (!peso) {
    return res.status(400).send({ message: "no puede haber un usuario sin peso" })
  }
  if (!estatura)
    return res.status(400).send({ message: "no puede haber un usuario sin estatura" });
  if (!presion)
    return res.status(400).send({ message: "no puede haber un usuario sin presion" });
  const salud = await Salud.update(
    { peso, estatura, movilidad, presion, comentario },
    {
      where: { id_menu: req.params.id },
      returning: true,
    }
  );
  res
    .status(200)
    .json({ message: "informe de salud modificado exitosamente", data: { salud } });
});
