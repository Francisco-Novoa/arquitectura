//importa la libreria express q permite hacer todo bonito y facil
import express from "express";
//importa el modelo perfil donde se definio esa entidad
import { Ruta } from "../../models/index.js";

//crea una ruta para la entidad
export const rutasRouter = express.Router();

//crea ruta que crea un perfil
rutasRouter.post("/", async (req, res) => {
  const { nombre, descripcion, dificultad, duracion, ubicacion } = req.body;
  if (nombre.length < 0)
    return res.status(400).send({ message: "nombre de la ruta es muy corto" });
  if (descripcion.length < 0)
    return res.status(400).send({ message: "la descripcion es muy corto" });
  if (dificultad.length < 0)
    return res.status(400).send({ message: "la dicultad es muy corta" });
  if (duracion.length < 0)
    return res.status(400).send({ message: "la duracion es mur corta " });
  if (ubicacion.length < 0)
    return res.status(400).send({ message: "la ubicacion no existe" });
  const rutas = await Ruta.create({ nombre });
  res
    .status(201)
    .json({ message: "banco creado exitosamente", data: { rutas } });
});

//crea ruta que obtiene todos los perfiles
rutasRouter.get("/", async (req, res) => {
  const rutas = await Ruta.findAll();
  res
    .status(200)
    .json({ message: "Bancos obtenidos exitosamente", data: { rutas } });
});

//crea ruta que obtiene un unico perfil
rutasRouter.get("/:id", async (req, res) => {
  const rutas = await Ruta.findByPk(req.params.id);
  res
    .status(200)
    .json({ message: "Banco obtenido exitosamente", data: { rutas } });
});

//crea ruta que borra un perfil
rutasRouter.delete("/:id", async (req, res) => {
  await Ruta.destroy({
    where: { id: req.params.id },
  });
  res.status(204);
});

//crea ruta que modifica un perfil
rutasRouter.put("/:id", async (req, res) => {
  if (nombre.length < 0)
    return res.status(400).send({ message: "nombre de la ruta es muy corto" });
  if (descripcion.length < 0)
    return res.status(400).send({ message: "la descripcion es muy corto" });
  if (dificultad.length < 0)
    return res.status(400).send({ message: "la dicultad es muy corta" });
  if (duracion.length < 0)
    return res.status(400).send({ message: "la duracion es mur corta " });
  if (ubicacion.length < 0)
    return res.status(400).send({ message: "la ubicacion no existe" });
  const rutas = await Ruta.update(
    { nombre, descripcion, dificultad, duracion, ubicacion },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  res
    .status(200)
    .json({ message: "Banco modificado exitosamente", data: { rutas } });
});
