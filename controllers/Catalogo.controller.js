import { getCatalogoPorTipo } from "../services/catalogos.js";

export const getCatalogosByType= async (req, res) => {
    const { tipo } = req.params;
    try {
        const catalogos = await getCatalogoPorTipo(tipo);
        return res.json(catalogos);
    } catch (error) {
        console.error("Error fetching catalogos by type:", error);
        return res.status(500).json({ msgError: "Internal Server Error" });
    }   
};