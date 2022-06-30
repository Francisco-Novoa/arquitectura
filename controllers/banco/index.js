import express from "express";
import { Banco } from "../../models/index.js";

export const bancoRouter = express.Router();

bancoRouter.post("/", async (req, res) => {
  const { nombre } = req.body;
  if (nombre.length < 0)
    return res.status(400).send({ message: "nombre del banco es muy corto" });
  const banco = await Banco.create({ nombre });
  res
    .status(201)
    .json({ message: "banco creado exitosamente", data: { banco } });
});

bancoRouter.get("/", async (req, res) => {
  const banco = await Banco.findAll();
  res
    .status(200)
    .json({ message: "Bancos obtenidos exitosamente", data: { banco } });
});

bancoRouter.get("/:id", async (req, res) => {
  const banco = await Banco.findByPk(req.params.id);
  if (!banco) res.status(404).json({ error: "banco no encontrado" });
  res
    .status(200)
    .json({ message: "Banco obtenido exitosamente", data: { banco } });
});

bancoRouter.delete("/:id", async (req, res) => {
  if (!(await Banco.findByPk(req.params.id)))
    return res.status(404).json({ error: "banco no encontrado" });
  await Banco.destroy({
    where: { id: req.params.id },
  });
  res.sendStatus(204);
});

bancoRouter.put("/:id", async (req, res) => {
  if (!(await Banco.findByPk(req.params.id)))
    return res.status(404).json({ error: "banco no encontrado" });
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
