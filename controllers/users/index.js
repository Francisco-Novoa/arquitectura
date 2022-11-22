import express from "express";

export const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {

  res.status(200).json({
    message: "usuario creado exitosamente"
  });
});
