//importa la libreria express q permite hacer todo bonito y facil
import express from "express";
//importa el modelo perfil donde se definio esa entidad
import { problema_salud } from "../../models/index.js";

//crea una ruta para la entidad
export const problema_saludRouter = express.Router();

//crea ruta que crea un perfil
problema_saludRouter.post("/", async (req, res) => {
  const { tipo } = req.body;
  if (tipo.length < 0)
    return res
      .status(400)
      .send({ message: "el tipo de problema es muy corto" });
  const Problema_Salud = await problema_salud.create({ tipo });
  res
    .status(201)
    .json({
      message: "problema salud creado exitosamente",
      data: { Problema_Salud },
    });
});

//crea ruta que obtiene todos los perfiles
problema_saludRouter.get("/", async (req, res) => {
  const problema_salud = await problema_salud.findAll();
  res
    .status(200)
    .json({
      message: "problema de salud obtenidos exitosamente",
      data: { Problema_salud },
    });
});

//crea ruta que obtiene un unico perfil
problema_saludRouter.get("/:id", async (req, res) => {
  const problema_salud = await problemas_salud.findByPk(req.params.id);
  res
    .status(200)
    .json({
      message: "problema de salud obtenido exitosamente",
      data: { problema_salud },
    });
});

//crea ruta que borra un perfil
problema_saludRouter.delete("/:id", async (req, res) => {
  await problema_salud.destroy({
    where: { id: req.params.id },
  });
  res.status(204);
});

//crea ruta que modifica un perfil
problema_saludRouter.put("/:id", async (req, res) => {
  const { tipo } = req.body;
  if (tipo.length < 0)
    return res
      .status(400)
      .send({ message: "el tipo de problema salud es muy corto" });
  const problema_salud = await problema_salud.update(
    { tipo },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  res
    .status(200)
    .json({
      message: "problema salud modificado exitosamente",
      data: { problema_salud },
    });
});
