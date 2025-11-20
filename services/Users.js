import { getConnection, mssql } from "../config/connectionSql.js";
import bcrypt from "bcryptjs";

import dotenv from "dotenv";
import {generarJwt} from "./Jwt.js";

const getUsers = async () => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("SELECT * FROM gestion_evidencias.usuarios ");
    console.log(result.recordset);
    return result.recordset;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getPassByDpi = async (correo) => {
  try {
    const pool = await getConnection();
    console.log("Fetching password for correo:", correo);
    const result = await pool
      .request()
      .input("correo", mssql.VarChar, correo)
      .query(
        "select p.pass from gestion_evidencias.usuarios u inner join gestion_evidencias.pass p on p.dpi = u.dpi where u.correo = @correo"
      );
    return result.recordset[0].pass;
  } catch (error) {
    console.error("Error fetching password by DPI:", error);
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

  const token = generarJwt({ correo });
  return token;
};
