import { Sequelize } from "sequelize";
import { error, info } from "../utils/logger.js";
import { DBUSER, DBPASS, DBHOST, DBPORT, DBNAME } from "../utils/config.js";
//conectandome a la base de datos
const sequelize = new Sequelize(
  `postgres://${DBUSER}:${DBPASS}@${DBHOST}:${DBPORT}/${DBNAME}`,
  {
    logging: false,
  }
);

//testiando si la coneccion funciona
try {
  await sequelize.authenticate();
  info("Database conection established");
} catch (err) {
  error("Unable to connect to the db", err);
}

export default sequelize;
