import express from "express";
import { Mensajeria, User } from "../../models/index.js";

export const msgRouter = express.Router();

msgRouter.post("/", async (req, res) => {
  const { titulo, cuerpo, emisor: emisorId, remitente: remitenteId } = req.body;
  if (!emisorId || !remitenteId) {
    return res.status(400).send({
      message: "no se puede enviar un mensaje sin emisor o sin remitente",
    });
  }
  const emisor = User.findByPk(emisorId);
  if (!emisor) return res.status(404).send({ message: "emisor no encontrado" });
  const remitente = User.findByPk(remitenteId);
  if (!remitente)
    return res.status(404).send({ message: "remitente no encontrado" });
  if (titulo.length < 3)
    return res.status(400).send({ message: "titulo del mensaje es muy corto" });
  if (cuerpo.length === 0)
    return res
      .status(400)
      .send({ message: "no se puede enviar un mensaje vacio" });
  const mensaje = await Mensajeria.create({
    titulo,
    cuerpo,
    emisor: emisorId,
    remitente: remitenteId,
  });
  res
    .status(201)
    .json({ message: "mensaje creado exitosamente", data: { mensaje } });
});

msgRouter.get("/", async (req, res) => {
  const mensaje = await Mensajeria.findAll();
  res
    .status(200)
    .json({ message: "mensajes obtenidos exitosamente", data: { mensaje } });
});

msgRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const mensaje = await Mensajeria.findByPk(id);
  if (!mensaje)
    return res.status(404).send({
      message: "mensaje no encontrado",
    });
  return res
    .status(200)
    .json({ message: "mensaje obtenido exitosamente", data: { mensaje } });
});

msgRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!(await Mensajeria.findByPk(id)))
    return res.status(404).send({
      message: "mensaje no encontrado",
    });
  await Mensajeria.destroy({
    where: { id: req.params.id },
  });
  return res.sendStatus(204);
});

msgRouter.put("/:id", async (req, res) => {
  const {
    titulo,
    cuerpo,
    emisor: emisorId,
    remitente: remitenteId,
    estado,
  } = req.body;
  const id = req.params.id;
  if (!(await Mensajeria.findByPk(id)))
    return res.status(404).send({
      message: "mensaje no encontrado",
    });
  if (!emisorId || !remitenteId) {
    return res.status(400).send({
      message: "no se puede enviar un mensaje sin emisor o sin remitente",
    });
  }
  const emisor = User.findByPk(emisorId);
  if (!emisor) return res.status(404).send({ message: "emisor no encontrado" });
  const remitente = User.findByPk(remitenteId);
  if (!remitente)
    return res.status(404).send({ message: "remitente no encontrado" });
  if (titulo.length < 3)
    return res.status(400).send({ message: "titulo del mensaje es muy corto" });
  if (cuerpo.length === 0)
    return res
      .status(400)
      .send({ message: "no se puede enviar un mensaje vacio" });
  const mensaje = await Mensajeria.update(
    { titulo, cuerpo, emisor: emisorId, remitente: remitenteId, estado },
    {
      where: { id },
      returning: true,
    }
  );
  return res
    .status(200)
    .json({ message: "mensaje modificado exitosamente", data: { mensaje } });
});
