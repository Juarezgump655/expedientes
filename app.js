import express from "express";
import expedienteRoutes from "./routes/expediente.routes.js";

const app = express();
const port = 8081;

// Middleware para JSON
app.use(express.json());
app.use("/api/expedientes", expedienteRoutes);
// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando con Node y Express");
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
