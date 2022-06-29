//importa la libreria express q permite hacer todo bonito y facil
import express from "express";
//importa el modelo perfil donde se definio esa entidad
import { Noticia } from "../../models/index.js";

//crea una ruta para la entidad
export const noticiasRouter = express.Router();

//crea ruta que crea un perfil
noticiasRouter.post("/", async (req, res) => {
  const { titulo, fecha, encabezado, cuerpo, prioridad } = req.body;
  if (titulo.length < 0)
    return res.status(400).send({ message: "El titulo  es muy corto" });
  if (fecha.length < 0)
    return res.status(400).send({ message: "La fecha no existe" });
  if (encabezado.length < 0)
    return res.status(400).send({ message: "El encabezado es muy chico" });
  if (cuerpo.length < 0)
    return res.status(400).send({ message: "El cuerpo es muy chico" });
  if (prioridad.length < 0)
    return res.status(400).send({ message: "                          " });
  const noticia = await Noticia.create({
    nombtitulo,
    fecha,
    encabezado,
    cuerpo,
    prioridad,
  });
  res
    .status(201)
    .json({ message: "Noticia creada exitosamente", data: { noticia } });
});

//crea ruta que obtiene todos los perfiles
noticiasRouter.get("/", async (req, res) => {
  const noticias = await Noticia.findAll();
  res
    .status(200)
    .json({ message: "Noticias obtenidas exitosamente", data: { noticias } });
});

//crea ruta que obtiene un unico perfil
noticiasRouter.get("/:id", async (req, res) => {
  const noticias = await Noticia.findByPk(req.params.id);
  res
    .status(200)
    .json({ message: "Noticias obtenido exitosamente", data: { noticias } });
});

//crea ruta que borra un perfil
noticiasRouter.delete("/:id", async (req, res) => {
  await Noticia.destroy({
    where: { id: req.params.id },
  });
  res.status(204);
});

//crea ruta que modifica un perfil
noticiasRouter.put("/:id", async (req, res) => {
  const { titulo, fecha, encabezado, cuerpo, prioridad } = req.body;
  if (titulo.length < 0)
    return res.status(400).send({ message: "El titulo  es muy corto" });
  if (fecha.length < 0)
    return res.status(400).send({ message: "La fecha no existe" });
  if (encabezado.length < 0)
    return res.status(400).send({ message: "El encabezado es muy chico" });
  if (cuerpo.length < 0)
    return res.status(400).send({ message: "El cuerpo es muy chico" });
  if (prioridad.length < 0)
    return res.status(400).send({ message: "             " });
  const noticias = await Noticia.update(
    { titulo, fecha, encabezado, cuerpo, prioridad },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  res
    .status(200)
    .json({ message: "Noticias modificadas exitosamente", data: { noticias } });
});
