import express from "express";
import { Local } from "../../models/index.js";

export const localRouter = express.Router();

localRouter.post("/", async (req, res) => {
  const { nombre, direccion, logo, usuarioId } = req.body;
  const local = await Local.create({ nombre, direccion, logo, usuarioId });
  return res
    .status(201)
    .json({ message: "local creado exitosamente", data: { local } });
});

localRouter.get("/", async (req, res) => {
  const local = await Local.findAll();
  return res
    .status(200)
    .json({ message: "locals obtenidos exitosamente", data: { local } });
});

localRouter.get("/:id", async (req, res) => {
  const local = await Local.findByPk(req.params.id);
  if (!local) res.status(404).json({ error: "local no encontrado" });
  return res
    .status(200)
    .json({ message: "local obtenido exitosamente", data: { local } });
});

localRouter.delete("/:id", async (req, res) => {
  if (!(await Local.findByPk(req.params.id)))
    return res.status(404).json({ error: "local no encontrado" });
  await Local.destroy({
    where: { id: req.params.id },
  });
  return res.sendStatus(204);
});

localRouter.put("/:id", async (req, res) => {
  if (!(await Local.findByPk(req.params.id)))
    return res.status(404).json({ error: "local no encontrado" });
  const { nombre, direccion, logo, usuarioId  } = req.body;
  const local = await Local.update(
    { nombre, direccion, logo, usuarioId  },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  return res
    .status(200)
    .json({ message: "local modificado exitosamente", data: { local } });
});
