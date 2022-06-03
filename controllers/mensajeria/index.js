import express from "express";
import { Mensajeria } from "../../models/index.js";

export const msgRouter = express.Router();

msgRouter.post("/", async (req, res) => {
  const { titulo, cuerpo, emisor, remitente } = req.body;
  if (!emisor || !remitente) {
    return res.status(400).send({ message: "no se puede enviar un mensaje sin emisor o sin remitente" })
  }
  if (titulo.length < 3)
    return res.status(400).send({ message: "titulo del mensaje es muy corto" });
  if (cuerpo.length === 0)
    return res.status(400).send({ message: "no se puede enviar un mensaje vacio" });
  const fecha = new Date(Date.now())
  const mensaje = await Mensajeria.create({ titulo, cuerpo, fecha });
  res.status(201).json({ message: "mensaje creado exitosamente", data: { mensaje } });
});

msgRouter.get("/", async (req, res) => { ///necesita validar usuario
  const mensaje = await Mensajeria.findAll();
  res
    .status(200)
    .json({ message: "mensaje obtenidos exitosamente", data: { mensaje } });
});

msgRouter.get("/:id", async (req, res) => {
  const mensaje = await Mensajeria.findByPk(req.params.id);
  res
    .status(200)
    .json({ message: "mensaje obtenido exitosamente", data: { mensaje } });
});

msgRouter.delete("/:id", async (req, res) => {
  await Mensajeria.destroy({
    where: { id: req.params.id },
  });
  res.status(204);
});

msgRouter.put("/:id", async (req, res) => {
  const { titulo, cuerpo, estado } = req.body;
  const mensaje = await Mensajeria.update(
    { titulo, cuerpo, estado },
    {
      where: { id_menu: req.params.id },
      returning: true,
    }
  );
  res
    .status(200)
    .json({ message: "mensaje modificado exitosamente", data: { mensaje } });
});
