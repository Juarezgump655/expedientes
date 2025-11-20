import jwt from "jsonwebtoken";
import dotenv from "dotenv";

function validarToken(req, res, next) {
  const rutasPublicas = ["/api/auth/login"];
  const token = req.headers["authorization"];
  if (rutasPublicas.includes(req.path)) {
    return next(); // permitir acceso
  }

  if (!token) {
    return res.status(401).json({ msg: "No hay token" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido" });
  }
}

export default validarToken;
