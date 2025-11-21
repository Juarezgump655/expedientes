import { getConnection, mssql } from "../config/connectionSql.js"; 


export const getExpedientesService = async (correo) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .execute("gestion_evidencias.sp_getExpedientesPorUsuario");

    console.log(result.recordset);
    return result.recordset;

  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const crearExpedienteService = async (expedienteData, correo) => {
    try {
        const pool = await getConnection();

        const { descripcion, usuario_creo } = expedienteData;

        const result = await pool.request()
            .input('descripcion', mssql.VarChar(150), descripcion)
            .input('usuario_creo', mssql.VarChar(35), correo)
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


export const actualizarARegistradoIndicioExpediente = async (noExpediente) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('noExpediente', mssql.VarChar, noExpediente)
            .execute('gestion_evidencias.sp_actualizar_expediente');
        return result.recordset;
    } catch (error) {
        console.error("Error updating indicio expediente to registered:", error);
        throw error;
    }   
}

export const getExpedienteForRevision = async (no_expediente) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .execute('gestion_evidencias.sp_getExpedientesRev')
        return result.recordset;
    } catch (error) {
        console.error("Error fetching expediente for revision:", error);
        throw error;
    }
};


export const revExpeediente = async (data) => {
    console.log("Data received for revision:", data);
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('noExpediente', mssql.VarChar, data.noExpediente)
            .input('estado', mssql.BigInt, data.estado)
            .input('usuario', mssql.VarChar(35), data.usuario)
            .input('justificacion', mssql.VarChar(300), data.justificacion)
            .execute('gestion_evidencias.sp_revision');
        return result.recordset;
    } catch (error) {
        console.error("Error reviewing expediente:", error);
        throw error;
    }   

};

