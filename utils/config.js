import dotenv from "dotenv";

dotenv.config();

let PORT = process.env.PORT;
let SECRET = process.env.SECRET;


export {
  PORT,
  SECRET
};
