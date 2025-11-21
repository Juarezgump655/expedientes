import { getConnection, mssql } from "../config/connectionSql.js";

export const getPantallasByRole = async (correo) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("correo", mssql.VarChar, correo)
      .execute(
        "gestion_evidencias.sp_getPantallasPorCorreo"
      );
    return result.recordset;
  } catch (error) {
    console.error("Error fetching pantallas by role:", error);
    throw error;
  }
};

export const getRolesUser = async (correo) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("correo", mssql.VarChar, correo)
      .execute(
        "gestion_evidencias.sp_getRolesPorCorreo"
      );
    return result.recordset;
  } catch (error) {
    console.error("Error fetching roles by user:", error);
    throw error;
  }
};
