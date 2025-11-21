import { getConnection, mssql } from "../config/connectionSql.js"; 


export const getDetallesIndiciosExpediente = async (no_expediente) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('noExpediente', mssql.VarChar, no_expediente)
            .execute('gestion_evidencias.sp_getExpedienteIndicios')
        return result.recordset;

    } catch (error) {
        console.error("Error fetching detalles indicios expediente:", error);
        throw error;
    }
};

export const crearIndicioExpediente = async (indicioData) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('noExpediente', mssql.VarChar, indicioData.noExpediente)
            .input('color', mssql.BigInt, indicioData.color)
            .input('unidadMedidaTamaño', mssql.BigInt, indicioData.unidadMedidaTamaño)
            .input('unidadMedidaPeso', mssql.BigInt, indicioData.unidadMedidaPeso)
            .input('tamaño', mssql.Decimal(10,2), indicioData.tamaño)
            .input('peso', mssql.Decimal(10,2), indicioData.peso)
            .input('descripcionObjeto', mssql.VarChar(300), indicioData.descripcionObjeto)
            .input('usuarioCreo', mssql.VarChar(35), indicioData.usuarioCreo)
            .execute('gestion_evidencias.sp_crear_expediente_indicio');
        return result.recordset;
    } catch (error) {
        console.error("Error creating indicio expediente:", error);
        throw error;
    }
};


export const actualizarIndicioExpediente = async (indicioData) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('idExpedienteInd', mssql.Int, indicioData.idIndicio)
            .input('color', mssql.BigInt, indicioData.color)
            .input('unidadMedidaTamaño', mssql.BigInt, indicioData.unidadMedidaTamaño)
            .input('unidadMedidaPeso', mssql.BigInt, indicioData.unidadMedidaPeso)
            .input('tamaño', mssql.Decimal(10,2), indicioData.tamaño)
            .input('peso', mssql.Decimal(10,2), indicioData.peso)
            .input('descripcionObjeto', mssql.VarChar(300), indicioData.descripcionObjeto)
            .input('usuarioModifico', mssql.VarChar(35), indicioData.usuarioModifico)
            .execute('gestion_evidencias.sp_actualizar_expediente_indicio');
        return result.recordset;
    } catch (error) {
        console.error("Error updating indicio expediente:", error);
        throw error;
    }       
};



 