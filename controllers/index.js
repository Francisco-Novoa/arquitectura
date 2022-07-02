import express from "express";

import { usersRouter } from "./users/index.js";
import { loginRouter } from "./login/index.js";
import { perfilRouter } from "./perfil/index.js";
import { menuRouter } from "./menu/index.js";
import { msgRouter } from "./mensajeria/index.js";
import { saludRouter } from "./salud/index.js";
import { bancoRouter } from "./banco/index.js";
import { inscripcionRouter } from "./inscripcion/index.js";
import { cuenta_corrienteRouter } from "./cuenta_corriente/index.js";
import { movimiento_cuenta_corrienteRouter } from "./movimiento_cuenta_corriente/index.js";
import { actividadRouter } from "./actividad/index.js";
import { rutasRouter } from "./rutas/index.js";
import { imagenesRouter } from "./imagenes/index.js";
import { noticiasRouter } from "./noticias/index.js";
import { problema_saludRouter } from "./problema_salud/index.js";
import { weatherRouter } from "./weather/index.js";

import { TokenValidation } from "../utils/tokenValidation.js";

export const MainRouter = express.Router();

MainRouter.use("/login", loginRouter);
MainRouter.use("/users", usersRouter);
MainRouter.use("/actividad", actividadRouter);
MainRouter.use("/perfil", perfilRouter);
MainRouter.use("/banco", TokenValidation, bancoRouter);
MainRouter.use("/cc", TokenValidation, cuenta_corrienteRouter);
MainRouter.use("/movcc", TokenValidation, movimiento_cuenta_corrienteRouter);
MainRouter.use("/menu", menuRouter);
MainRouter.use("/inscripcion", inscripcionRouter);
MainRouter.use("/mensaje", msgRouter);
MainRouter.use("/salud", saludRouter);
MainRouter.use("/psalud", problema_saludRouter);
MainRouter.use("/rutas", rutasRouter);
MainRouter.use("/imagenes", imagenesRouter);
MainRouter.use("/noticias", noticiasRouter);
MainRouter.use("/weather", weatherRouter);
