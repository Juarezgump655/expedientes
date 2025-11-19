import { getConnection, mssql } from "../config/connectionSql.js"; 

export const getExpedientesService = async () => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("select * from gestion_evidencias.expediente e");
        console.log(result.recordset);
        return result.recordset;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }       
};

export const crearExpedienteService = async (expedienteData) => {
    try {
        const pool = await getConnection();

        const { descripcion, usuario_creo } = expedienteData;

        const result = await pool.request()
            .input('descripcion', mssql.VarChar(150), descripcion)
            .input('usuario_creo', mssql.VarChar(35), usuario_creo)
            .execute('gestion_evidencias.sp_crear_expediente');

        return {
            message: "Expediente creado exitosamente",
            expediente: result.recordset[0].no_expediente_creado
        };

    } catch (error) {
        console.error("Error creando expediente:", error);
        throw error;
    }
};