
import api from "../services/api.service.js";


export const getExpedientes = async () => {
  const res = await api.get("/expedientes/getExpedientes");
  return res.data;
};

export const crearExpediente = async (data) => {
  const res = await api.post("/expedientes/crear", data);
  return res.data;
}

export const actualizarRegistroExpediente = async (noExpediente) => {
  const res = await api.put(`/expedientes/actualizarARegistrado/${noExpediente}`);
  return res.data;
}


export const getExpedientesForRevision = async () => {
  const res = await api.get("/expedientes/getExpedientesRev");
  return res.data;
};


export const revisarExpediente = async (data) => {
  const res = await api.post("/expedientes/revExpediente", data);
  return res.data;
}

export const buscarExpedientesPorFecha = async (filtros) => {
  const res = await api.post("/expedientes/getExpedientesByFechas", filtros);
  return res.data;
} 