import express from "express";

import { usersRouter } from "./users/index.js";

export const MainRouter = express.Router();


MainRouter.use("/users", usersRouter);
