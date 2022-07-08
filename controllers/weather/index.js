import express from "express";
// import { WEATHERAPI } from "../../utils/config.js";
import axios from "axios";
export const weatherRouter = express.Router();

weatherRouter.get("/", async (req, res) => {
  const weather = await axios.get(
    `http://api.weatherstack.com/current?access_key=${WEATHERAPI}&query=${req.query.query}`
  );
  return res.status(200).send({ data: { weather: weather.data } });
});
