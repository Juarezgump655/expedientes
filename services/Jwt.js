import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const generarJwt = (user) => {
    const token = jwt.sign(
        {correo: user.correo , dpi: user.dpi },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_DURATION }
    );
    return token;
}