import express from "express";
import { Producto } from "../../models/index.js";

export const productoRouter = express.Router();

productoRouter.get("/of/:id", async (req, res) => {
  const producto = await Producto.findAll({
    where: {
      localId: req.params.id
    }
  });
  res
    .status(200)
    .json({ message: "Productos obtenidos exitosamente", data: { producto } });
});

productoRouter.post("/", async (req, res) => {
  const { nombre, descripcion, foto, precio, localId } = req.body;
  const producto = await Producto.create({ nombre, descripcion, foto, precio, localId });
  res
    .status(201)
    .json({ message: "Producto creado exitosamente", data: { producto } });
});

productoRouter.get("/", async (req, res) => {
  const producto = await Producto.findAll();
  res
    .status(200)
    .json({ message: "Productos obtenidos exitosamente", data: { producto } });
});

productoRouter.get("/:id", async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto) res.status(404).json({ error: "Producto no encontrado" });
  res
    .status(200)
    .json({ message: "Producto obtenido exitosamente", data: { banco } });
});

productoRouter.delete("/:id", async (req, res) => {
  if (!(await Producto.findByPk(req.params.id)))
    return res.status(404).json({ error: "Producto no encontrado" });
  await Producto.destroy({
    where: { id: req.params.id },
  });
  res.sendStatus(204);
});

productoRouter.put("/:id", async (req, res) => {
  if (!(await Producto.findByPk(req.params.id)))
    return res.status(404).json({ error: "Producto no encontrado" });
  const { nombre, descripcion, foto, precio, localId } = req.body;
  const producto = await Producto.update(
    { nombre, descripcion, foto, precio, localId },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  res
    .status(200)
    .json({ message: "Producto modificado exitosamente", data: { producto } });
});
