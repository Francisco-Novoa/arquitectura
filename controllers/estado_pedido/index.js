import express from "express";
import { EstadoPedido } from "../../models/index.js";

export const estadoPedidoRouter = express.Router();

estadoPedidoRouter.post("/", async (req, res) => {
  const {
    nombre,
  } = req.body;

  const estadoPedido = await EstadoPedido.create(
    {
        nombre,
    },
    { raw: true }
  );
  res.status(201).json({
    message: "estado de pedido creado exitosamente",
    data: { estadoPedido },
  });
});

