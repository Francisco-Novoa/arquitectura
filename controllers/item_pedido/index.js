import express from "express";
import { ItemPedido } from "../../models/index.js";

export const itemPedidoRouter = express.Router();

itemPedidoRouter.post("/", async (req, res) => {
  const {
    montoAhorrado,
    cantidad,
    pedidoId,
    productoId,
  } = req.body;

  if (!pedidoId) {
    return res.status(400).json({
      message: "id pedido no encontrada"
    })
  }

  if (!productoId) {
    return res.status(400).json({
      message: "id producto no encontrada"
    })
  }

  const itemPedido = await ItemPedido.create(
    {
      montoAhorrado,
      cantidad,
      pedidoId,
      productoId,
    },
    { raw: true }
  );
  res.status(201).json({
    message: "detalle creado exitosamente",
    data: { itemPedido },
  });
});

