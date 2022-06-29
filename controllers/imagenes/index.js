//importa la libreria express q permite hacer todo bonito y facil
import express from "express";
//importa el modelo perfil donde se definio esa entidad
import { Imagen } from "../../models/index.js";

//crea una ruta para la entidad
export const imagenesRouter = express.Router();

//crea ruta que crea un perfil
imagenesRouter.post("/", async (req, res) => {
  const { url, alt } = req.body;
  if (url.length < 0)
    return res.status(400).send({ message: "la url es muy corta " });
  if (alt.length < 0)
    return res.status(400).send({ message: "                       " });
  const imagenes = await Imagen.create({ url });
  res
    .status(201)
    .json({ message: "imagen creada exitosamente", data: { imagenes } });
});

//crea ruta que obtiene todos los perfiles
imagenesRouter.get("/", async (req, res) => {
  const imagenes = await Imagen.findAll();
  res
    .status(200)
    .json({ message: "imagenes obtenidas exitosamente", data: { imagenes } });
});

//crea ruta que obtiene un unico perfil
imagenesRouter.get("/:id", async (req, res) => {
  const imagenes = await Imagen.findByPk(req.params.id);
  res
    .status(200)
    .json({ message: "imagene obtenida exitosamente", data: { imagenes } });
});

//crea ruta que borra un perfil
imagenesRouter.delete("/:id", async (req, res) => {
  await Imagen.destroy({
    where: { id: req.params.id },
  });
  res.status(204);
});

//crea ruta que modifica un perfil
imagenesRouter.put("/:id", async (req, res) => {
  const { url, alt } = req.body;
  if (url.length < 0)
    return res.status(400).send({ message: "la url es muy corta" });
  if (alt.length < 0)
    return res.status(400).send({ message: "                  " });
  const imagenes = await Imagen.update(
    { url, alt },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  res
    .status(200)
    .json({ message: "imagen modificado exitosamente", data: { imagenes } });
});
