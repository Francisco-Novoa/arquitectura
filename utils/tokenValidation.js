import jwt from "jsonwebtoken";
import { SECRET } from "../utils/config.js";

export const TokenValidation = (request, response, next) => {
  //function to validate a jwt token

  //if there is no token abort.
  const header = request.get("authorization");
  if (!header) return response.sendStatus(403);

  //separate the token from the bearer
  token = header.split(" ")[1];

  //extract the user and id from the token
  const { username, id } = jwt.verify(token, SECRET);

  //asignt the user and the id to the request.body object
  Object.assign(request.body, { username, id });

  //and send it down the chain
  next();
};
