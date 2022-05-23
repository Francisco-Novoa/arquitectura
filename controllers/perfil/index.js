//importa la libreria express q permite hacer todo bonito y facil
import express from "express";
//importa el modelo perfil donde se definio esa entidad
import { Perfil } from "../../models/index.js";

//crea una ruta para la entidad
export const perfilRouter = express.Router();

//crea ruta que crea un perfil
perfilRouter.post("/", async (req, res) => {
  const { tipo } = req.body;
  if (tipo.length < 3)
    return res.status(400).send({ message: "nombre del perfil es muy corto" });
  const perfil = await Perfil.create({ tipo });
  res
    .status(201)
    .json({ message: "tipo creado exitosamente", data: { perfil } });
});

//crea ruta que obtiene todos los perfiles
perfilRouter.get("/", async (req, res) => {
  const perfiles = await Perfil.findAll();
  res
    .status(200)
    .json({ message: "tipos obtenidos exitosamente", data: { perfiles } });
});

//crea ruta que obtiene un unico perfil
perfilRouter.get("/:id", async (req, res) => {
  const perfiles = await Perfil.findByPk(req.params.id);
  res
    .status(200)
    .json({ message: "tipo obtenido exitosamente", data: { perfiles } });
});

//crea ruta que borra un perfil
perfilRouter.delete("/:id", async (req, res) => {
  await Perfil.destroy({
    where: { id_perfil: req.params.id },
  });
  res.status(204);
});

//crea ruta que modifica un perfil
perfilRouter.put("/:id", async (req, res) => {
  const { tipo } = req.body;
  const perfiles = await Perfil.update(
    { tipo },
    {
      where: { id_perfil: req.params.id },
      returning: true,
    }
  );
  res
    .status(200)
    .json({ message: "tipos modificados exitosamente", data: { perfiles } });
});
