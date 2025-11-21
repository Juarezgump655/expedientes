
import api from "../services/api.service.js";


export const getCatlogoByNombre = async (nombreCatalogo) => {
  const res = await api.get(`/catalogos/catalogosbytipo/${nombreCatalogo}`);
  return res.data;
}