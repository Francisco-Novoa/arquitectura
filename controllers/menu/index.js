import express from "express";
import { Menu } from "../../models/index.js";

export const menuRouter = express.Router();

menuRouter.post("/", async (req, res) => {
  const { titulo } = req.body;
  if (titulo.length < 3)
    return res.status(400).send({ message: "titulo del menu es muy corto" });
  const menu = await Menu.create({ titulo });
  res.status(201).json({ message: "menu creado exitosamente", data: { menu } });
});

menuRouter.get("/", async (req, res) => {
  const menu = await Menu.findAll();
  res
    .status(200)
    .json({ message: "menu obtenidos exitosamente", data: { menu } });
});

menuRouter.get("/:id", async (req, res) => {
  const menu = await Menu.findByPk(req.params.id);
  if (!menu) return res.status(404).send({ message: "menu no encontrado" });
  res
    .status(200)
    .json({ message: "menu obtenido exitosamente", data: { menu } });
});

menuRouter.delete("/:id", async (req, res) => {
  if (!(await Menu.findByPk(req.params.id)))
    return res.status(404).send({ message: "menu no encontrado" });
  await Menu.destroy({
    where: { id_menu: req.params.id },
  });
  res.sendStatus(204);
});

menuRouter.put("/:id", async (req, res) => {
  const { titulo } = req.body;

  if (!(await Menu.findByPk(req.params.id)))
    return res.status(404).send({ message: "menu no encontrado" });
  const menu = await Menu.update(
    { titulo },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  res
    .status(200)
    .json({ message: "menu modificados exitosamente", data: { menu } });
});
