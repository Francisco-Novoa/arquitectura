import express from "express";
import { Imagen } from "../../models/index.js";

export const imagenesRouter = express.Router();

imagenesRouter.post("/", async (req, res) => {
  const { url, alt } = req.body;
  if (!url)
    return res.status(400).send({ message: "la url no puede estar vacia" });
  if (!alt)
    return res
      .status(400)
      .send({ message: "el texto alt no puede estar vacio" });
  const imagenes = await Imagen.create({ url, alt });
  return res
    .status(201)
    .json({ message: "imagen creada exitosamente", data: { imagenes } });
});

imagenesRouter.get("/", async (req, res) => {
  const imagenes = await Imagen.findAll();
  return res
    .status(200)
    .json({ message: "imagenes obtenidas exitosamente", data: { imagenes } });
});

imagenesRouter.get("/:id", async (req, res) => {
  const imagenes = await Imagen.findByPk(req.params.id);
  if (!imagenes)
    return res.status(404).send({ message: "imagen no encontrada" });
  res
    .status(200)
    .json({ message: "imagen obtenida exitosamente", data: { imagenes } });
});

imagenesRouter.delete("/:id", async (req, res) => {
  if (!(await Imagen.findByPk(req.params.id)))
    return res.status(404).send({ message: "imagen no encontrada" });
  await Imagen.destroy({
    where: { id: req.params.id },
  });
  res.sendStatus(204);
});

imagenesRouter.put("/:id", async (req, res) => {
  if (!(await Imagen.findByPk(req.params.id)))
    return res.status(404).send({ message: "imagen no encontrada" });
  const { url, alt } = req.body;
  if (!url)
    return res.status(400).send({ message: "la url no puede estar vacia" });
  if (!alt)
    return res
      .status(400)
      .send({ message: "el texto alt no puede estar vacio" });
  const imagenes = await Imagen.update(
    { url, alt },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  return res
    .status(200)
    .json({ message: "imagen modificado exitosamente", data: { imagenes } });
});
