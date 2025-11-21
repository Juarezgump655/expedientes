import { getConnection, mssql } from "../config/connectionSql.js";
import bcrypt from "bcryptjs";
import {getPantallasByRole, getRolesUser} from "./roles.js";
import dotenv from "dotenv";
import {generarJwt} from "./Jwt.js";

const getPassByDpi = async (correo) => {
  try {
    const pool = await getConnection();
    console.log("Fetching password for correo:", correo);
    const result = await pool
      .request()
      .input("correo", mssql.VarChar, correo)
      .execute(
        "gestion_evidencias.sp_getPassPorCorreo"
      );
    return result.recordset[0].pass;
  } catch (error) {
    console.error("Error fetching password by DPI:", error);
    throw error;
  }
};

const getNameByCorreo = async (correo) => {
  try {
    const pool = await getConnection();
    console.log("Fetching name for correo:", correo);
    const result = await pool
      .request()
      .input("correo", mssql.VarChar, correo)
      .execute(
        "gestion_evidencias.sp_getUsuarioPorCorreo"
      );
    return result.recordset[0];
  } catch (error) {
    console.error("Error fetching name by correo:", error);
    throw error;
  }
};

export const validarUsuarioPass = async (correo, password) => {
  const pass = await getPassByDpi(correo);
  console.log("Pass from DB:", pass);
  const validPass = await bcrypt.compare(password, pass);
  if (!validPass) {
    throw new Error("Contraseña incorrecta");
  }
  const roles = await getRolesUser(correo);
  const user = await getNameByCorreo(correo);
  const pantallas = await getPantallasByRole(correo);

  const token = generarJwt({ correo, dpi: user.dpi });
  return { token, nombre: user.nombre, roles, pantallas };
};
