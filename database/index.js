import oracledb from 'oracledb';

async function run() {
  try {
   const connection = await oracledb.getConnection({ user: "yacaeats", password: "463871", connectionString: "localhost/xepdb1" });
    console.log("Successfully connected to Oracle Database");
    return connection
  } catch (err) {
    console.error(err);
  } 
}

export default run();