import { info } from "./logger.js";

export const unknownEndpoint = (request, response) => {
  info("404 called");
  response.status(404).send({ error: "unknown endpoint" });
};
