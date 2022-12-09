import express from "express";
import sequelize from "../../database/database.js";
import { QueryTypes } from 'sequelize';
import { ItemPedido, Pedido, Producto } from "../../models/index.js";

export const pedidoRouter = express.Router();
pedidoRouter.get("/of/:id", async (req, res) => {
  const pedido = await sequelize.query(`
  with 
  productos as (
    select 
      ip."productoId" producto_id ,
      ip."pedidoId" pedido_id, 
      ip.cantidad,
      ip."montoAhorrado",
      p.id,
      p.nombre,
      p.descripcion,
      p.foto ,
      p.precio ,
      p."localId" 
    from item_pedido ip 
      join producto p on ip."productoId" = p.id
    where p."localId" = ${req.params.id}
  ), detalle as (
    select 
      p2.pedido_id,
        jsonb_build_object(
          'id', p2."producto_id",
          'cantidad', p2.cantidad,
          'montoAhorrado', p2."montoAhorrado",
          'nombre', p2.nombre,
          'descripcion', p2.descripcion,
          'foto', p2.foto,
          'precio', p2.precio
        ) 
      producto 
      from productos p2 
  )
  select 
    pd.id,
    pd.total,
    pd."precioEnvio",
    pd.fecha,
    pd.iva,
    pd.comision,
    pd.propina,
    pd.subtotal,
    pd."estadoPedidoNombre",
    json_agg(d.producto) producto
  from pedido pd
    join detalle d on pd.id = d.pedido_id
  group by
  	pd.id,
    pd.total,
    pd."precioEnvio",
    pd.fecha,
    pd.iva,
    pd.comision,
    pd.propina,
    pd.subtotal,
    pd."estadoPedidoNombre"
  order by pd.id
  `)
  return res
    .status(200)
    .json({ message: "pedidos obtenidos exitosamente", data: { pedido } });
  });

pedidoRouter.post("/", async (req, res) => {
  const { total, precioEnvio, iva, comision, propina, subtotal, estadoPedidoNombre, usuarioId  } = req.body;
  const pedido = await Pedido.create({ total, precioEnvio, iva, comision, propina, subtotal, estadoPedidoNombre, usuarioId });
  return res
    .status(201)
    .json({ message: "pedido creado exitosamente", data: { pedido } });
});

pedidoRouter.get("/", async (req, res) => {
  const pedido = await Pedido.findAll();
  return res
    .status(200)
    .json({ message: "pedidos obtenidos exitosamente", data: { pedido } });
});

pedidoRouter.get("/:id", async (req, res) => {
  const pedido = await Pedido.findByPk(req.params.id, { 
    include: [ {
      model:  ItemPedido,
      include: Producto
    }] 
  });
  if (!pedido) res.status(404).json({ error: "pedido no encontrado" });
  return res
    .status(200)
    .json({ message: "pedido obtenido exitosamente", data: { pedido } });
});

pedidoRouter.delete("/:id", async (req, res) => {
  if (!(await Pedido.findByPk(req.params.id)))
    return res.status(404).json({ error: "pedido no encontrado" });
  await Pedido.destroy({
    where: { id: req.params.id },
  });
  return res.sendStatus(204);
});

pedidoRouter.put("/:id", async (req, res) => {
  if (!(await Pedido.findByPk(req.params.id)))
    return res.status(404).json({ error: "pedido no encontrado" });
  const { total, precioEnvio, iva, comision, propina, subtotal, estadoPedidoNombre, usuarioId } = req.body;
  const pedido = await Pedido.update(
    { total, precioEnvio, iva, comision, propina, subtotal, estadoPedidoNombre, usuarioId  },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  return res
    .status(200)
    .json({ message: "pedido modificado exitosamente", data: { pedido } });
});
