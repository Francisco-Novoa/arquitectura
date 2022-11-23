import oracledb from 'oracledb';


export async function createPool() {
  try {
    await oracledb.createPool({
      user: "yacaeats", password: "463871", connectionString: "localhost/xepdb1"
    });
    console.log('Connection pool started');
  } catch (err) {
    console.error(err);
  } 
}