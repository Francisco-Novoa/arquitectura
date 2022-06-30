import express from "express";
import { Menu, Perfil } from "../../models/index.js";

export const perfilRouter = express.Router();

perfilRouter.post("/addMenu", async (req, res) => {
  const { menuId, perfilId } = req.body;

  const perfil = await Perfil.findByPk(perfilId);
  if (!perfil) return res.status(404).send({ message: "pefil no encontrado" });

  const menu = await Menu.findByPk(menuId);
  if (!menu) return res.status(404).send({ message: "menu no encontrado" });

  await perfil.addMenu(menu);

  res.sendStatus(200);
});

perfilRouter.post("/", async (req, res) => {
  const { tipo } = req.body;
  if (tipo.length < 3)
    return res.status(400).send({ message: "nombre del perfil es muy corto" });
  const perfil = await Perfil.create({ tipo });
  res
    .status(201)
    .json({ message: "perfil creado exitosamente", data: { perfil } });
});

perfilRouter.get("/", async (req, res) => {
  const perfiles = await Perfil.findAll({ include: Menu });
  res
    .status(200)
    .json({ message: "perfil obtenidos exitosamente", data: { perfiles } });
});

perfilRouter.get("/:id", async (req, res) => {
  const perfil = await Perfil.findByPk(req.params.id, { include: Menu });
  if (!perfil) return res.status(404).send({ message: "perfil no encontrado" });
  res
    .status(200)
    .json({ message: "perfil obtenido exitosamente", data: { perfil } });
});

perfilRouter.delete("/:id", async (req, res) => {
  if (!(await Perfil.findByPk(req.params.id)))
    return res.status(404).send({ message: "perfiol no encontrado" });
  await Perfil.destroy({
    where: { id_perfil: req.params.id },
  });
  res.sendStatus(204);
});

perfilRouter.put("/:id", async (req, res) => {
  if (!(await Perfil.findByPk(req.params.id)))
    return res.status(404).send({ message: "pefil no encontrado" });

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
    .json({ message: "perfil modificados exitosamente", data: { perfiles } });
});
