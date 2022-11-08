import express from "express";

import { actividadRouter } from "./actividad/index.js";
import { TokenValidation } from "../utils/tokenValidation.js";

export const MainRouter = express.Router();

MainRouter.use("/actividad", actividadRouter);

