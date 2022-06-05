//importa la libreria express q permite hacer todo bonito y facil
import express from "express";
//importa el modelo perfil donde se definio esa entidad
import { Cuenta_corriente } from "../../models/index.js";

//crea una ruta para la entidad
export const cuenta_corrienteRouter = express.Router();

//crea ruta que crea un perfil
cuenta_corrienteRouter.post("/", async (req, res) => {
  const { nro_cuenta, titular, tipo_cuenta } = req.body;
  if (titular.length < 0) 
    return res.status(400).send({ message: "nombre del titular es muy corto" });
  if (nro_cuenta.length < 8)
    return res.status(400).send({ message: "numero de cuenta muy corto" });
  const cuenta_corriente = await Cuenta_corriente.create({nro_cuenta, titular, tipo_cuenta });
  res
    .status(201)
    .json({ message: "Cuenta corriente creada exitosamente", data: { cuentas_corrientes } });
  });

//crea ruta que obtiene todas las cuentas-
cuenta_corrienteRouter.get("/", async (req, res) => {
  const cuentas_corrientes = await Cuenta_corriente.findAll();
  res
    .status(200)
    .json({ message: "Cuentas obtenidas exitosamente", data: { cuentas_corrientes } });
});

//crea ruta que obtiene un unico perfil
cuenta_corrienteRouter.get("/:id", async (req, res) => {
  const cuentas_corrientes = await Cuenta_corriente.findByPk(req.params.id);
  res
    .status(200)
    .json({ message: "Cuenta corriente obtenida exitosamente", data: { cuentas_corrientes } });
});

//crea ruta que borra un perfil
cuenta_corrienteRouter.delete("/:id", async (req, res) => {
  await Cuenta_corriente.destroy({
    where: { nro_cuenta: req.params.id },
  });
  res.status(204);
});

//crea ruta que modifica un perfil
cuenta_corrienteRouter.put("/:id", async (req, res) => {
  const { nro_cuenta, titular, tipo_cuenta } = req.body;
  if (titular.length < 0) 
    return res.status(400).send({ message: "nombre del titular es muy corto" });
  if (nro_cuenta.length < 8)
    return res.status(400).send({ message: "numero de cuenta muy corto" });
  const cuenta_corriente = await Cuenta_corriente.update(
    { nro_cuenta, titular, tipo_cuenta },
    {
      where: { nro_cuenta: req.params.id },
      returning: true, 
    }
  );
  res
    .status(200)
    .json({ message: "Cuenta corriente modificada exitosamente", data: { cuenta_corriente } });
});
