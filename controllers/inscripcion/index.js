import express from "express";
import { Actividad, Inscripcion } from "../../models/index.js";

export const inscripcionRouter = express.Router();

inscripcionRouter.post("/", async (req, res) => {
  const {
    tipo,
    fecha,
    estado_pago,
    tipo_pago,
    estado,
    tipo_usuario,
    actividadId,
  } = req.body;
  const usuarioId = req.body.private.id;
  if (!tipo)
    return res.status(400).send({ message: "debe incluir tipo de actividad" });
  if (!fecha) return res.status(400).send({ message: "debe incluir fecha" });
  if (!estado_pago)
    return res.status(400).send({ message: "debe incluir estado del pago" });
  if (!tipo_pago)
    return res.status(400).send({ message: "debe incluir tipo del pago" });
  const actividad = await Actividad.findByPk(parseInt(actividadId, 10));
  if (!actividad)
    return res.status(404).send({
      message: "Actividad no encontrada",
    });

  const inscripcion = await Inscripcion.create({
    tipo,
    fecha,
    estado_pago,
    tipo_pago,
    estado,
    tipo_usuario,
    actividadId: parseInt(actividadId, 10),
    usuarioId,
  });

  return res.status(201).json({
    message: "Inscripcion realizada exitosamente",
    data: { inscripcion },
  });
});

inscripcionRouter.get("/", async (req, res) => {
  const usuarioId = req.body.private.id;
  const inscripcion = await Inscripcion.findAll({
    where: { usuarioId },
  });
  return res.status(200).json({
    message: "Inscripciones obtenidas exitosamente",
    data: { inscripcion },
  });
});

inscripcionRouter.get("/:id", async (req, res) => {
  const inscripcion = await Inscripcion.findByPk(req.params.id);
  if (!inscripcion)
    return res.status(404).send({ message: "inscripcion no encontrada" });
  return res.status(200).json({
    message: "Inscripcion obtenida exitosamente",
    data: { inscripcion },
  });
});

inscripcionRouter.delete("/:id", async (req, res) => {
  if (!(await Inscripcion.findByPk(req.params.id)))
    return res.status(404).send({ message: "inscripcion no encontrada" });
  await Inscripcion.destroy({
    where: { id: req.params.id },
  });
  res.sendStatus(204);
});

inscripcionRouter.put("/:id", async (req, res) => {
  const {
    tipo,
    fecha,
    estado_pago,
    tipo_pago,
    estado,
    tipo_usuario,
    actividadId,
  } = req.body;
  if (!(await Inscripcion.findByPk(req.params.id)))
    return res.status(404).send({ message: "inscripcion no encontrada" });
  const usuarioId = req.body.private.id;

  const actividad = await Actividad.findByPk(actividadId);
  if (!actividad)
    return res.status(404).send({
      message: "Actividad no encontrada",
    });

  if (!tipo)
    return res.status(400).send({ message: "debe incluir tipo de actividad" });
  if (!fecha) return res.status(400).send({ message: "debe incluir fecha" });
  if (!estado_pago)
    return res.status(400).send({ message: "debe incluir estado del pago" });
  if (!tipo_pago)
    return res.status(400).send({ message: "debe incluir tipo del pago" });

  const inscripcion = await Inscripcion.update(
    {
      tipo,
      fecha,
      estado_pago,
      tipo_pago,
      estado,
      tipo_usuario,
      actividadId,
      usuarioId,
    },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  res.status(200).json({
    message: "Resumen de inscripcion obtenido exitosamente",
    data: { inscripcion },
  });
});
