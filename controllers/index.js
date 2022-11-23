import express from "express";

import { usersRouter } from "./users/index.js";
import { restaurantRouter } from "./restaurants/index.js";
import { pedidosRouter } from "./pedidos/index.js";
import { productosRouter } from "./productos/index.js";

export const MainRouter = express.Router();


MainRouter.use("/users", usersRouter);
MainRouter.use("/restaurant", restaurantRouter);
MainRouter.use("/pedidos", pedidosRouter);
MainRouter.use("/productos", productosRouter);
