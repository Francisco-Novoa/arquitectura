import express from "express";
import { Actividad } from "../../models/index.js";

export const actividadRouter = express.Router();

actividadRouter.post("/", async (req, res) => {
  const { hora, fecha, cupo, cupo_traslado, precio } = req.body;
  if (hora.length === 0)
    return res
      .status(400)
      .send({ message: "La hora de la actividad esta vacia" });
  if (fecha.length === 0)
    return res.status(400).send({ message: "La fecha esta vacia" });
  if (cupo.length === 0)
    return res
      .status(400)
      .send({ message: "no puede haber una actividad sin cupos" });
  const actividad = await Actividad.create({
    hora,
    fecha,
    cupo,
    cupo_traslado,
    precio,
  });
  res
    .status(201)
    .json({ message: "actividad creada exitosamente", data: { actividad } });
});

actividadRouter.get("/", async (req, res) => {
  const actividad = await Actividad.findAll();
  res.status(200).json({
    message: "actividad obtenidas exitosamente",
    data: { actividad },
  });
});

actividadRouter.get("/:id", async (req, res) => {
  if (!(await Actividad.findByPk(req.params.id)))
    return res.status(404).send({ message: "actividad no encontrada" });
  const actividad = await Actividad.findByPk(req.params.id);
  res.status(200).json({
    message: "actividades obtenidas exitosamente",
    data: { actividad },
  });
});

actividadRouter.delete("/:id", async (req, res) => {
  if (!(await Actividad.findByPk(req.params.id)))
    return res.status(404).send({ message: "actividad no encontrada" });
  await Actividad.destroy({
    where: { id: req.params.id },
  });
  res.sendStatus(204);
});

//crea ruta que modifica un perfil
actividadRouter.put("/:id", async (req, res) => {
  if (!(await Actividad.findByPk(req.params.id)))
    return res.status(404).send({ message: "actividad no encontrada" });
  const { hora, fecha, cupo, cupo_traslado, precio, estado } = req.body;
  if (hora.length === 0)
    return res
      .status(400)
      .send({ message: "La hora de la actividad esta vacia" });
  if (fecha.length === 0)
    return res.status(400).send({ message: "La fecha esta vacia" });
  if (cupo.length === 0)
    return res
      .status(400)
      .send({ message: "no puede haber una actividad sin cupos" });
  const actividad = await Actividad.update(
    { hora, fecha, cupo, cupo_traslado, precio, estado },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  res.status(200).json({
    message: "actividad fue modificada exitosamente",
    data: { actividad },
  });
});
