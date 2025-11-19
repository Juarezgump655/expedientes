import { getConnection, mssql } from "../config/connectionSql.js"; 

const getUsers = async () => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM gestion_evidencias.usuarios ");
        console.log(result.recordset);
        return result.recordset;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }       
};

