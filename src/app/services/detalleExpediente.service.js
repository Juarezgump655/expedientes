
import api from "../services/api.service.js";


export const getDetalleExpediente = async (noExpediente) => {
  const res = await api.get(`/indiciosExpediente/getDetalleExpediente/${noExpediente}`);
  return res.data;
}

export const crearIndicioExpediente = async (indicioData) => {
  const res = await api.post(`/indiciosExpediente/crearIndicioExpediente`, indicioData);
  return res.data;
}

export const actualizarIndicioExpediente = async (indicioData) => {
  const res = await api.post(`/indiciosExpediente/modificarIndicioExpediente`, indicioData);
  return res.data;
}
