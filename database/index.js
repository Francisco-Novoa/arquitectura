import oracledb from 'oracledb';

const connection  = async () => {
    try {
        const connection = await oracledb.getConnection({ user: "PANCHO", password: "463871", connectionString: "localhost:1521/xepdb1" });
        console.log('DB reached successfully')
        return connection;
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
};
    
export default connection() 