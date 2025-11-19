import { getExpedientesService, crearExpedienteService } from "../services/Expedientes.js";


export const getExpedientes = async (req, res) => {
    try {
        const expedientes = await getExpedientesService();
        return res.json(expedientes);
        
    } catch (error) {
        console.error("Error al obtener expedientes:", error);
        return res.status(500).json({ error: "Error al obtener expedientes" });
    }
};

export const crearExpediente = async (req, res) => {
    try {
        const expediente = await crearExpedienteService(req.body);
        return res.json(expediente);

    } catch (error) {
        console.error("Error al crear expediente:", error);
        return res.status(500).json({ error: "No se pudo crear el expediente" });
    }
};