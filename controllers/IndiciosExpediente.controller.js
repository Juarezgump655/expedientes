import {getDetallesIndiciosExpediente, crearIndicioExpediente,actualizarIndicioExpediente } from "../services/IndiciosExpediente.js";

export const getIndiciosExpediente = async (req, res) => {
    const { noExpediente } =  req.params;
    console.log("No Expediente recibido:", noExpediente);
    try {
        const detallesIndicios = await getDetallesIndiciosExpediente(noExpediente);
        return res.json(detallesIndicios);
    } catch (error) {
        console.error("Error fetching indicios expediente:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const crearIndicioExpedienteController = async (req, res) => {
    const indicioData = req.body;   
    indicioData.usuarioCreo = req.user.dpi;
    try {
        const nuevoIndicio = await crearIndicioExpediente(indicioData);
        return res.json(nuevoIndicio);
    } catch (error) {
        console.error("Error creating indicio expediente:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};  

export const actualizarARegistradoIndicioExpedienteController = async (req, res) => {
    const indicio = req.body; 
    indicio.usuarioModifico = req.user.dpi;
    console.log("Indicio recibido for update:", indicio);
    try {
        const resultado = await actualizarIndicioExpediente(indicio);
        return res.json(resultado);
    } catch (error) {
        console.error("Error updating indicio expediente to registered:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

            