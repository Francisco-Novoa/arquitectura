//importa la libreria express q permite hacer todo bonito y facil
import express from "express";
//importa el modelo perfil donde se definio esa entidad
import { MovCuentaCorriente } from "../../models/index.js";

//crea una ruta para la entidad
export const movimiento_cuenta_corrienteRouter = express.Router();

//crea ruta que crea un perfil
movimiento_cuenta_corrienteRouter.post("/", async (req, res) => {
  const { hora, monto } = req.body;
  if (hora.length < 0)
    return res.status(400).send({ message: "la hora no coincide " });
  if (monto.length < 0)
    return res.status(400).send({ message: "el monto no coincide " });
  const result = await MovCuentaCorriente.create({ nombre });
  res.status(201).json({
    message: "movimiento cuenta corriente creado exitosamente",
    data: { movimientos: result },
  });
});

//crea ruta que obtiene todos los perfiles
movimiento_cuenta_corrienteRouter.get("/", async (req, res) => {
  const result = await MovCuentaCorriente.findAll();
  res.status(200).json({
    message: "movimiento cuenta corriente obtenidos exitosamente",
    data: { movimientos: result },
  });
});

//crea ruta que obtiene un unico perfil
movimiento_cuenta_corrienteRouter.get("/:id", async (req, res) => {
  const result = await MovCuentaCorriente.findByPk(req.params.id);
  res.status(200).json({
    message: "movimiento cuenta corriente obtenido exitosamente",
    data: { movimientos: result },
  });
});

//crea ruta que borra un perfil
movimiento_cuenta_corrienteRouter.delete("/:id", async (req, res) => {
  await MovCuentaCorriente.destroy({
    where: { id: req.params.id },
  });
  res.status(204);
});

//crea ruta que modifica un perfil
movimiento_cuenta_corrienteRouter.put("/:id", async (req, res) => {
  const { hora, monto } = req.body;
  if (hora.length < 0)
    return res.status(400).send({ message: "la hora no existe " });
  if (monto.length < 0)
    return res.status(400).send({ message: "el monto no existe" });
  const result = await MovCuentaCorriente.update(
    { hora, monto },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  res.status(200).json({
    message: "movimiento cuenta corriente modificado exitosamente",
    data: { movimientos: result },
  });
});
