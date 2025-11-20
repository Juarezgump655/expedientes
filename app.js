import express from "express";
import expedienteRoutes from "./routes/expediente.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import validarToken from "./middlewares/auth.js";
const port = 8081;
const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(validarToken);

app.use(express.json());
app.use("/api/expedientes", expedienteRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("API funcionando con Node y Express");
});



// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

