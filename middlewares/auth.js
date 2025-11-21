import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const msgSinToken = "No hay token en la petición del cliente";
const msgTokenNoValido = "El token no es válido";

function validarToken(req, res, next) {
  const rutasPublicas = ["/api/auth/login"];
  const token = req.headers["authorization"];
  if (rutasPublicas.includes(req.path)) {
    return next(); 
  }

  if (!token) {
    return res.status(401).json({ msgError: msgSinToken });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = {
      correo: decoded.correo,
      dpi: decoded.dpi
    };
    next();
  } catch (error) {
    return res.status(401).json({ msgError: msgTokenNoValido});
  }
}

export default validarToken;
