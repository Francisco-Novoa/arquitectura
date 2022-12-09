import express from "express";
import { estadoPedidoRouter } from "./estado_pedido/index.js";
import { usuarioRouter } from "./usuario/index.js";
import { tipoUsuarioRouter } from "./tipo_usuario/index.js";
import { localRouter } from "./local/index.js";
import { productoRouter } from "./producto/index.js";
import { pedidoRouter } from "./pedido/index.js"
import { itemPedidoRouter } from "./item_pedido/index.js";

export const MainRouter = express.Router();

MainRouter.use("/estado_pedido", estadoPedidoRouter);
MainRouter.use("/usuario", usuarioRouter);
MainRouter.use("/tipo_usuario", tipoUsuarioRouter);
MainRouter.use("/local", localRouter);
MainRouter.use("/producto", productoRouter);
MainRouter.use("/pedido", pedidoRouter);
MainRouter.use("/item_pedido", itemPedidoRouter);
