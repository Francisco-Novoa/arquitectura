import dotenv from "dotenv";

dotenv.config();

let PORT = process.env.PORT;
let SECRET = process.env.SECRET;
let DBUSER = process.env.DBUSER;
let DBPASS = process.env.DBPASS;
let DBHOST = process.env.DBHOST;
let DBPORT = process.env.DBPORT;
let DBNAME = process.env.DBNAME;

export { PORT, SECRET, DBUSER, DBPASS, DBHOST, DBPORT, DBNAME };
