import api from "../services/api.service.js";


export const realizarLogin = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};
