import express from "express";

import { usersRouter } from "./users/index.js";
import { loginRouter } from "./login/index.js";
import { perfilRouter } from "./perfil/index.js";
import { menuRouter } from "./menu/index.js";
import { msgRouter } from "./mensajeria/index.js";
import { saludRouter } from "./salud/index.js";
// import { TokenValidation } from "../utils/tokenValidation.js";

export const MainRouter = express.Router();

MainRouter.use("/login", loginRouter);
MainRouter.use("/users", usersRouter);
MainRouter.use("/perfil", perfilRouter);
MainRouter.use("/menu", menuRouter);
MainRouter.use("/mensaje", msgRouter)
MainRouter.use("/salud", saludRouter)
