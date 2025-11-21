import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { realizarLogin } from "../services/auth.service.js";
import { mostrarAlerta } from "../utils/alerUtil.js";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
});

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    realizarLogin(data.email, data.password)
      .then((response) => {
        mostrarAlerta("success", "Éxito", "Inicio de sesión exitoso");
        guardarDatos(response);
        navigate("/dashboard");
      }).catch((error) => {
        console.error("Error en el inicio de sesión:", error);
      });
  };


  const guardarDatos = (response) => {
    localStorage.setItem("nombre", response.nombre);
    localStorage.setItem("token", response.token);
   localStorage.setItem("roles", JSON.stringify(response.roles));
   localStorage.setItem("pantallas", JSON.stringify(response.pantallas));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/24/MP_logo.png"
            alt="MP Logo"
            className="w-24 h-24 drop-shadow-md"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Dirección de Investigación Criminalística
        </h1>

        <p className="text-gray-600 text-sm mb-8">Ministerio Público</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Ingresa tu correo"
            {...register("email")}
            className={`w-full mb-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
              ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-900"}
            `}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>
          )}
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            {...register("password")}
            className={`w-full mb-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
              ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-900"}
            `}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-3">{errors.password.message}</p>
          )}

          <button
            className="flex items-center justify-center w-full bg-gray-900 text-white rounded-lg shadow-md px-6 py-3 font-medium hover:bg-blue-600 transition mt-4"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
