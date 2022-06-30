import express from "express";
import { Cuenta_corriente } from "../../models/index.js";
import { Banco } from "../../models/index.js";

export const cuenta_corrienteRouter = express.Router();

cuenta_corrienteRouter.post("/", async (req, res) => {
  const { nro_cuenta, titular, tipo_cuenta, bancoId } = req.body;
  const usuarioId = req.body.private.id;
  if (titular.length < 0)
    return res.status(400).send({ message: "nombre del titular es muy corto" });
  if (nro_cuenta.length < 8)
    return res.status(400).send({ message: "numero de cuenta muy corto" });
  if (!bancoId)
    return res
      .status(400)
      .send({ message: "una cuenta corriente necesita pertenecer a un banco" });
  if (!(await Banco.findByPk(bancoId)))
    return res.status(400).send({ message: "banco enviado no fue encontrado" });

  const cuenta_corriente = await Cuenta_corriente.create({
    nro_cuenta,
    titular,
    tipo_cuenta,
    bancoId,
    usuarioId,
  });
  return res.status(201).json({
    message: "Cuenta corriente creada exitosamente",
    data: { cuenta_corriente },
  });
});

cuenta_corrienteRouter.get("/", async (req, res) => {
  const cuenta_corriente = await Cuenta_corriente.findAll();
  return res.status(200).json({
    message: "Cuentas obtenidas exitosamente",
    data: { cuenta_corriente },
  });
});

cuenta_corrienteRouter.get("/:nro_cuenta", async (req, res) => {
  const cuenta_corriente = await Cuenta_corriente.findByPk(
    req.params.nro_cuenta
  );
  if (!cuenta_corriente)
    return res.status(404).json({
      message: "cuenta corriente no encontrada",
    });
  return res.status(200).json({
    message: "Cuenta corriente obtenida exitosamente",
    data: { cuenta_corriente },
  });
});

cuenta_corrienteRouter.delete("/:nro_cuenta", async (req, res) => {
  const nro_cuenta = req.params.nro_cuenta;
  if (!(await Cuenta_corriente.findByPk(parseInt(nro_cuenta, 10))))
    return res.status(404).json({
      message: "cuenta corriente no encontrada",
    });
  await Cuenta_corriente.destroy({
    where: { nro_cuenta },
  });
  res.sendStatus(204);
});

cuenta_corrienteRouter.put("/:nro_cuenta", async (req, res) => {
  const nro_cuenta = req.params.nro_cuenta;
  if (!(await Cuenta_corriente.findByPk(parseInt(nro_cuenta, 10))))
    return res.status(404).json({
      message: "cuenta corriente no encontrada",
    });
  const { titular, tipo_cuenta, bancoId } = req.body;
  if (titular.length < 0)
    return res.status(400).send({ message: "nombre del titular es muy corto" });
  if (nro_cuenta.length < 8)
    return res.status(400).send({ message: "numero de cuenta muy corto" });
  if (!(await Banco.findByPk(bancoId)))
    return res.status(400).send({ message: "banco enviado no fue encontrado" });
  const cuenta_corriente = await Cuenta_corriente.update(
    { titular, tipo_cuenta, bancoId },
    {
      where: { nro_cuenta },
      returning: true,
    }
  );
  return res.status(200).json({
    message: "Cuenta corriente modificada exitosamente",
    data: { cuenta_corriente },
  });
});
