import express from "express";
import { Ruta, Imagen } from "../../models/index.js";
import { TokenValidation } from "../../utils/tokenValidation.js";

export const rutasRouter = express.Router();

rutasRouter.post("/addImagen", async (req, res) => {
  const { ruta: idRuta, imagen: idImagen } = req.body;

  const ruta = await Ruta.findByPk(idRuta);
  if (!ruta) return res.status(404).send({ message: "ruta no encontrada" });

  const imagen = await Imagen.findByPk(idImagen);
  if (!imagen) return res.status(404).send({ message: "imagen no encontrada" });

  await ruta.addImagenes(imagen);

  return res.status(201).json({
    message: "imagen asignada a ruta exitosamente",
  });
});

rutasRouter.post("/", async (req, res) => {
  const { nombre, descripcion, dificultad, duracion, ubicacion, comentario } =
    req.body;
  if (!nombre)
    return res.status(400).send({ message: "no puede haber ruta sin nombre" });
  if (!descripcion)
    return res
      .status(400)
      .send({ message: "no puede haber ruta sin descripcion" });
  if (!dificultad)
    return res
      .status(400)
      .send({ message: "no puede haber ruta sin dificultad" });
  if (!duracion)
    return res
      .status(400)
      .send({ message: "no puede haber ruta sin duracion" });
  if (!ubicacion)
    return res
      .status(400)
      .send({ message: "no puede haber ruta sin ubicacion" });
  const rutas = await Ruta.create({
    nombre,
    descripcion,
    dificultad,
    duracion,
    ubicacion,
    comentario,
  });
  return res
    .status(201)
    .json({ message: "ruta creada exitosamente", data: { rutas } });
});

rutasRouter.get("/", async (req, res) => {
  const rutas = await Ruta.findAll({ include: Imagen });
  return res
    .status(200)
    .json({ message: "rutas obtenidas exitosamente", data: { rutas } });
});

rutasRouter.get("/:id", async (req, res) => {
  const rutas = await Ruta.findByPk(req.params.id, { include: Imagen });
  if (!rutas) return res.status(404).send({ message: "ruta no encontrada" });
  return res
    .status(200)
    .json({ message: "ruta obtenida exitosamente", data: { rutas } });
});

rutasRouter.delete("/:id", async (req, res) => {
  if (!(await Ruta.findByPk(req.params.id)))
    return res.status(404).send({ message: "ruta no encontrada" });
  await Ruta.destroy({
    where: { id: req.params.id },
  });
  res.sendStatus(204);
});

rutasRouter.put("/:id", async (req, res) => {
  const { nombre, descripcion, dificultad, duracion, ubicacion, comentario } =
    req.body;
  if (!(await Ruta.findByPk(req.params.id)))
    return res.status(404).send({ message: "ruta no encontrada" });
  if (!nombre)
    return res.status(400).send({ message: "no puede haber ruta sin nombre" });
  if (!descripcion)
    return res
      .status(400)
      .send({ message: "no puede haber ruta sin descripcion" });
  if (!dificultad)
    return res
      .status(400)
      .send({ message: "no puede haber ruta sin dificultad" });
  if (!duracion)
    return res
      .status(400)
      .send({ message: "no puede haber ruta sin duracion" });
  if (!ubicacion)
    return res
      .status(400)
      .send({ message: "no puede haber ruta sin ubicacion" });
  const rutas = await Ruta.update(
    { nombre, descripcion, dificultad, duracion, ubicacion, comentario },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  return res
    .status(200)
    .json({ message: "Ruta modificada exitosamente", data: { rutas } });
});
