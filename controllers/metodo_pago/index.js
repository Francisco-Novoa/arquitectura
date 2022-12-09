import express from "express";
import { MetodoPago } from "../../models/index.js";

export const metodoPagoRouter = express.Router();

metodoPagoRouter.post("/", async (req, res) => {
  const {
    nombre,
  } = req.body;

  const metodoPago = await MetodoPago.create(
    {
        nombre,
    },
    { raw: true }
  );
  res.status(201).json({
    message: "estado de pedido creado exitosamente",
    data: { metodoPago },
  });
});

