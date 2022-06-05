import express from "express";
import { Inscripcion } from "../../models/index.js";

export const inscripcionRouter = express.Router();

inscripcionRouter.post("/", async (req, res) => {
  const { tipo, fecha, estado_pago, tipo_pago, estado, tipo_usuario } = req.body;
    //validaciones??
  const inscripcion = await Inscripcion.create({ tipo, fecha, estado_pago, tipo_pago, estado, tipo_usuario });
  res.status(201).json({ message: "Inscripcion realizada exitosamente", data: { inscripcion } });
});

inscripcionRouter.get("/", async (req, res) => {
  const inscripcion = await Inscripcion.findAll();
  res
    .status(200)
    .json({ message: "Inscripciones obtenidas exitosamente", data: { inscripcion } });
});


inscripcionRouter.get("/:id", async (req, res) => { //hay q validar permisos
  const inscripcion = await Inscripcion.findByPk(req.params.id);
  res
    .status(200)
    .json({ message: "Resumen de inscripcion obtenido exitosamente", data: { inscripcion } });
});

inscripcionRouter.delete("/:id", async (req, res) => {
  await Inscripcion.destroy({
    where: { id: req.params.id },
  });
  res.status(204);
});

inscripcionRouter.put("/:id", async (req, res) => {
  const { tipo, fecha, estado_pago, tipo_pago, estado, tipo_usuario } = req.body;
    //validacion??
  const inscripcion = await Inscripcion.update(
    { tipo, fecha, estado_pago, tipo_pago, estado, tipo_usuario },
    {
      where: { id_menu: req.params.id },
      returning: true,
    }
  );
  res
    .status(200)
    .json({ message: "Resumen de inscripcion obtenido exitosamente", data: { inscripcion } });
});
