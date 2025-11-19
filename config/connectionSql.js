import mssql from 'mssql';
import dotenv from "dotenv";

dotenv.config({ path: 'env/Environment.env' });


console.log("DB_SERVER:", process.env.DB_SERVER); 
const connectionSettings = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

export async function getConnection() {
    try{
    return await mssql.connect(connectionSettings);
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        throw error;
    }

}

export { mssql };