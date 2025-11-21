import { getExpedientesService, crearExpedienteService , actualizarARegistradoIndicioExpediente, getExpedienteForRevision, revExpeediente} from "../services/Expedientes.js";

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
        const expediente = await crearExpedienteService(req.body, req.user.dpi);
        return res.json(expediente);

    } catch (error) {
        console.error("Error al crear expediente:", error);
        return res.status(500).json({ msgError: "No se pudo crear el expediente" });
    }
};



export const actualizarARegistradoIndicioExpedienteController = async (req, res) => {
    const { noExpediente } = req.params;
    try {
        const resultado = await actualizarARegistradoIndicioExpediente(noExpediente);
        return res.json(resultado);
    } catch (error) {
        console.error("Error updating indicio expediente to registered:", error);
        return res.status(500).json({ msgError: "Internal Server Error" });
    }
};

export const getExpedienteForRevisionController = async (req, res) => {
        try {
        const expedientes = await getExpedienteForRevision();
        return res.json(expedientes);
    } catch (error) {
        console.error("Error al obtener expedientes:", error);
        return res.status(500).json({ msgError: "Error al obtener expedientes" });
    }

};

export const revExpeedienteController = async (req, res) => {
        const expediente = req.body; 
        expediente.usuario  = req.user.dpi;
        try {
        const resultado = await revExpeediente(expediente);
        return res.json(resultado);
    } catch (error) {
        console.error("Error al obtener expediente para revision:", error);
        return res.status(500).json({ msgError: "Error al obtener expediente para revision" });
    }
};