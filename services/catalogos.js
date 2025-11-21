import { getConnection, mssql } from "../config/connectionSql.js"; 

export const getCatalogoPorTipo = async (tipo) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('nombre', mssql.VarChar, tipo)
            .execute('gestion_evidencias.sp_getCatalogosPorTipo')
        return result.recordset;
    } catch (error) {
        console.error("Error fetching catalogo por tipo:", error);
        throw error;
    }
};  