import oracledb from 'oracledb';


export async function createPool() {
  try {
    await oracledb.createPool({
      user: "yacaeats", password: "1234567890", connectionString: "localhost/xepdb1"
    });
    console.log('Connection pool started');
  } catch (err) {
    console.error(err);
  } 
}