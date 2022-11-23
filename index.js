import http from "http";

import app from "./app.js";
import { PORT } from "./utils/config.js";
import { info } from "./utils/logger.js";

//inicializa la coneccion a la base de datos
import { createPool } from "./database/index.js"

createPool()

const server = http.createServer(app);

server.listen(PORT, () => {
  info(`SERVER RUNNING ON PORT ${PORT}`);
  info("-----");
});
