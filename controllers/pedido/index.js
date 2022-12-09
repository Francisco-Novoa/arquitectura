import express from "express";
import { ItemPedido, Pedido, Producto } from "../../models/index.js";

export const pedidoRouter = express.Router();

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
  const { nombre, descripcion, foto, precio, stock, local } = req.body;
  const pedido = await Pedido.update(
    { nombre, descripcion, foto, precio, stock, localId: local },
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  return res
    .status(200)
    .json({ message: "pedido modificado exitosamente", data: { pedido } });
});
