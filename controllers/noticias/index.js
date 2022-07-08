import express from "express";
import sequelize from "../../database/database.js";
import { Noticia, User, Imagen } from "../../models/index.js";

export const noticiasRouter = express.Router();

noticiasRouter.post("/addImagen", async (req, res) => {
  const { noticia: idNoticia, imagen: idImagen } = req.body;

  const noticia = await Noticia.findByPk(idNoticia);
  if (!noticia)
    return res.status(404).send({ message: "noticia no encontrada" });

  const imagen = await Imagen.findByPk(idImagen);
  if (!imagen) return res.status(404).send({ message: "imagen no encontrada" });

  await noticia.addImagenes(imagen);

  return res.status(201).json({
    message: "imagen asignada a noticia exitosamente",
  });
});

noticiasRouter.post("/", async (req, res) => {
  const {
    titulo,
    encabezado,
    cuerpo,
    prioridad,
    usuario: usuarioId,
  } = req.body;
  if (!(await User.findByPk(usuarioId)))
    return res.status(400).send({ message: "usuario no encontrado" });
  if (!titulo)
    return res.status(400).send({ message: "no puede haber un titulo vacio" });
  if (!cuerpo)
    return res
      .status(400)
      .send({ message: "no puede haber una noticia sin un cuerpo" });
  const noticia = await Noticia.create({
    titulo,
    encabezado,
    cuerpo,
    prioridad,
    usuarioId,
  });
  return res
    .status(201)
    .json({ message: "Noticia creada exitosamente", data: { noticia } });
});

noticiasRouter.get("/", async (req, res) => {
  const [results, metadata] = await sequelize.query(
    `with imagenes as (
      select array_agg(json_build_object('url', i.url, 'alt', i.alt, 'id', i.id)) as imagen, ni."noticiaId"  from imagenes i 
      join noticia_imagen ni on i.id=ni."imageneId"
      group by ni."noticiaId"
    ) select n.id, n.titulo, n.fecha,
            n.encabezado, n.cuerpo, n.prioridad,
            u.nombre as username, i.imagen 
          from noticias n 
          join usuarios u on n."usuarioId"  = u.id
          left join imagenes i on n.id = i."noticiaId"`
  );
  return res.status(200).json({
    message: "Noticias obtenidas exitosamente",
    data: { noticias: results },
  });
});

noticiasRouter.get("/:id", async (req, res) => {
  const noticias = await Noticia.findByPk(req.params.id, { include: Imagen });
  if (!noticias)
    return res.status(404).send({ message: "noticia no encontrada" });
  res
    .status(200)
    .json({ message: "Noticias obtenido exitosamente", data: { noticias } });
});

noticiasRouter.delete("/:id", async (req, res) => {
  if (!(await Noticia.findByPk(req.params.id)))
    return res.status(404).send({ message: "noticia no encontrada" });
  await Noticia.destroy({
    where: { id: req.params.id },
  });
  res.sendStatus(204);
});

noticiasRouter.put("/:id", async (req, res) => {
  const {
    titulo,
    fecha,
    encabezado,
    cuerpo,
    prioridad,
    usuario: usuarioId,
  } = req.body;
  if (!(await User.findByPk(usuarioId)))
    return res.status(400).send({ message: "usuario no encontrado" });
  if (!titulo)
    return res.status(400).send({ message: "no puede haber un titulo vacio" });
  if (!cuerpo)
    return res
      .status(400)
      .send({ message: "no puede haber una noticia sin un cuerpo" });
  const noticias = await Noticia.update(
    { titulo, encabezado, cuerpo, prioridad, usuarioId, fecha },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  res
    .status(200)
    .json({ message: "Noticias modificadas exitosamente", data: { noticias } });
});
