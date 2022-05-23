import express from "express";
import { Menu } from "../../models/index.js";

export const menuRouter = express.Router();

menuRouter.post("/", async (req, res) => {
  const { titulo, url } = req.body;
  if (titulo.length < 3)
    return res.status(400).send({ message: "titulo del menu es muy corto" });
  if (url.length < 3)
    return res.status(400).send({ message: "url del menu es muy corto" });
  const menu = await Menu.create({ titulo, url });
  res.status(201).json({ message: "menu creado exitosamente", data: { menu } });
});

menuRouter.get("/", async (req, res) => {
  const menues = await Menu.findAll();
  res
    .status(200)
    .json({ message: "menues obtenidos exitosamente", data: { menues } });
});

menuRouter.get("/:id", async (req, res) => {
  const menues = await Menu.findByPk(req.params.id);
  res
    .status(200)
    .json({ message: "menu obtenido exitosamente", data: { menues } });
});

menuRouter.delete("/:id", async (req, res) => {
  await Menu.destroy({
    where: { id_menu: req.params.id },
  });
  res.status(204);
});

menuRouter.put("/:id", async (req, res) => {
  const { tipo } = req.body;
  const menues = await Menu.update(
    { tipo },
    {
      where: { id_menu: req.params.id },
      returning: true,
    }
  );
  res
    .status(200)
    .json({ message: "menu modificados exitosamente", data: { menues } });
});
