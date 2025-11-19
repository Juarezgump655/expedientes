

export const getExpedientes = async () => {
    const response = await fetch("http://localhost:8081/api/expedientes/getExpedientes");
    if (!response.ok) {
        throw new Error("Error al obtener expedientes");
    }
    return await response.json();
};
