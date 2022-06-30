import express from "express";
import { Cuenta_corriente, MovCuentaCorriente } from "../../models/index.js";

export const movimiento_cuenta_corrienteRouter = express.Router();

movimiento_cuenta_corrienteRouter.post("/", async (req, res) => {
  const { hora, monto, nroCuenta } = req.body;
  if (hora.length < 0)
    return res.status(400).send({ message: "la hora no puede llegar vacia" });
  if (monto.length < 0)
    return res.status(400).send({ message: "el monto no puede llegar vacio" });
  if (!(await Cuenta_corriente.findByPk(nroCuenta)))
    return res
      .status(400)
      .send({ message: "cuenta corriente enviado no fue encontrado" });
  const movimiento = await MovCuentaCorriente.create({
    hora,
    monto,
    cuentaCorrienteNroCuenta: nroCuenta,
  });
  return res.status(201).json({
    message: "movimiento cuenta corriente creado exitosamente",
    data: { movimiento },
  });
});

movimiento_cuenta_corrienteRouter.get("/", async (req, res) => {
  const result = await MovCuentaCorriente.findAll();
  return res.status(200).json({
    message: "movimiento cuenta corriente obtenidos exitosamente",
    data: { movimientos: result },
  });
});

movimiento_cuenta_corrienteRouter.get("/:id", async (req, res) => {
  const result = await MovCuentaCorriente.findByPk(req.params.id);
  if (!result)
    return res.status(400).send({
      message: " movimiento de cuenta corriente enviado no fue encontrado",
    });
  res.status(200).json({
    message: "movimiento cuenta corriente obtenido exitosamente",
    data: { movimientos: result },
  });
});

movimiento_cuenta_corrienteRouter.delete("/:id", async (req, res) => {
  if (!(await MovCuentaCorriente.findByPk(req.params.id)))
    return res.status(400).send({
      message: "movimiento de cuenta corriente enviado no fue encontrado",
    });
  await MovCuentaCorriente.destroy({
    where: { id: req.params.id },
  });
  res.status(204);
});

movimiento_cuenta_corrienteRouter.put("/:id", async (req, res) => {
  if (!(await MovCuentaCorriente.findByPk(req.params.id)))
    return res.status(400).send({
      message: "movimiento de cuenta corriente enviado no fue encontrado",
    });
  const { hora, monto, nroCuenta } = req.body;
  if (hora.length < 0)
    return res.status(400).send({ message: "la hora no existe " });
  if (monto.length < 0)
    return res.status(400).send({ message: "el monto no existe" });
  const result = await MovCuentaCorriente.update(
    { hora, monto, cuentaCorrienteNroCuenta: nroCuenta },
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
