//importa la libreria express q permite hacer todo bonito y facil
import express from "express";
//importa el modelo perfil donde se definio esa entidad
import { Banco } from "../../models/index.js";

//crea una ruta para la entidad
export const bancoRouter = express.Router();

//crea ruta que crea un banco
bancoRouter.post("/", async (req, res) => {
  const { nombre } = req.body;
  if (nombre.length < 0)
    return res.status(400).send({ message: "nombre del banco es muy corto" });
  const banco = await Banco.create({ nombre });
  res
    .status(201)
    .json({ message: "banco creado exitosamente", data: { banco } });
});

//crea ruta que obtiene todos los bancos
bancoRouter.get("/", async (req, res) => {
  const banco = await Banco.findAll();
  res
    .status(200)
    .json({ message: "Bancos obtenidos exitosamente", data: { banco } });
});

//crea ruta que obtiene un unico banco
bancoRouter.get("/:id", async (req, res) => {
  const banco = await Banco.findByPk(req.params.id);
  res
    .status(200)
    .json({ message: "Banco obtenido exitosamente", data: { banco } });
});

//crea ruta que borra un banco
bancoRouter.delete("/:id", async (req, res) => {
  await Banco.destroy({
    where: { id: req.params.id },
  });
  res.status(204);
});

//crea ruta que modifica un banco
bancoRouter.put("/:id", async (req, res) => {
  const { nombre } = req.body;
  if (nombre.length < 0)
    return res.status(400).send({ message: "nombre del banco es muy corto" });
  const banco = await Banco.update(
    { nombre },
    {
      where: { id: req.params.id },
      returning: true, 
    }
  );
  res
    .status(200)
    .json({ message: "Banco modificado exitosamente", data: { banco } });
});
