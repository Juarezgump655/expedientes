// components/CrearIndicioForm.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getCatlogoByNombre } from "../services/catalogo.service.js";
import {
  crearIndicioExpediente,
  actualizarIndicioExpediente,
} from "../services/detalleExpediente.service.js";
import { mostrarAlerta } from "../utils/alerUtil.js";

const schema = yup.object().shape({
  descripcionObjeto: yup
    .string()
    .required("La descripción es obligatoria")
    .max(300, "Máximo 300 caracteres"),

  tamaño: yup
    .string()
    .required("El tamaño es obligatorio")
    .matches(
      /^\d+(\.\d{1,2})?$/,
      "Ingrese un número válido con hasta 2 decimales"
    ),

  unidadMedidaTamaño: yup.string().required("Seleccione unidad de tamaño"),

  peso: yup
    .string()
    .required("El peso es obligatorio")
    .matches(
      /^\d+(\.\d{1,2})?$/,
      "Ingrese un número válido con hasta 2 decimales"
    ),

  unidadMedidaPeso: yup.string().required("Seleccione unidad de peso"),

  color: yup.string().required("Seleccione color"),
});
export default function CrearIndicioForm({
  noExpediente,
  indicioSeleccionado = null,
  onClose,
}) {
  const [colores, setColores] = useState([]);
  const [unidadesPeso, setUnidadesPeso] = useState([]);
  const [unidadesTamaño, setUnidadesTamaño] = useState([]);

  // Cargar catálogos
  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const coloresData = await getCatlogoByNombre("COLORES");
        const pesoData = await getCatlogoByNombre("UNIDAD_MEDIDA_PESO");
        const tamañoData = await getCatlogoByNombre("UNIDAD_MEDIDA_TAMAÑO");

        setColores(coloresData || []);
        setUnidadesPeso(pesoData || []);
        setUnidadesTamaño(tamañoData || []);
      } catch (error) {
        console.error("Error al cargar los catálogos:", error);
      }
    };
    cargarCatalogos();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      descripcionObjeto: indicioSeleccionado?.descripcionObjeto || "",
      tamaño:
        indicioSeleccionado?.tamaño != null
          ? parseFloat(indicioSeleccionado.tamaño).toFixed(2)
          : "",
      unidadMedidaTamaño: indicioSeleccionado?.unidadMedidaTamaño || "",
      peso:
        indicioSeleccionado?.peso != null
          ? parseFloat(indicioSeleccionado.peso).toFixed(2)
          : "",
      unidadMedidaPeso: indicioSeleccionado?.unidadMedidaPeso || "",
      color: indicioSeleccionado?.color || "",
    },
  });

  // Para actualizar valores si el indicio cambia
useEffect(() => {
  if (indicioSeleccionado) {
    reset({
      descripcionObjeto: indicioSeleccionado.descripcionObjeto || "",
      tamaño:
        indicioSeleccionado.tamaño != null
          ? parseFloat(indicioSeleccionado.tamaño).toFixed(2)
          : "",
      unidadMedidaTamaño: indicioSeleccionado.unidadMedidaTamaño || "",
      peso:
        indicioSeleccionado.peso != null
          ? parseFloat(indicioSeleccionado.peso).toFixed(2)
          : "",
      unidadMedidaPeso: indicioSeleccionado.unidadMedidaPeso || "",
      color: indicioSeleccionado.color || "",
    });
  }
}, [indicioSeleccionado, reset]);

  const submit = (data) => {
    data.noExpediente = noExpediente;

    if (indicioSeleccionado) {
      // Actualizar
      data.idIndicio = indicioSeleccionado.idExpedienteInd;
      actualizarIndicioExpediente(data)
        .then(() => {
          mostrarAlerta(
            "success",
            "Éxito",
            "Indicio actualizado correctamente"
          );
          onClose();
        })
        .catch((err) => console.error("Error al actualizar indicio:", err));
    } else {
      crearIndicioExpediente(data)
        .then(() => {
          mostrarAlerta("success", "Éxito", "Indicio creado correctamente");
          onClose();
        })
        .catch((err) => console.error("Error al crear indicio:", err));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-3 p-4 w-full"
    >
      <h2 className="text-lg font-bold">
        {indicioSeleccionado ? "Editar Indicio" : "Crear Indicio"}
      </h2>

      <label>Descripción del Objeto</label>
      <textarea
        {...register("descripcionObjeto")}
        className="border rounded px-3 py-2"
      />
      {errors.descripcionObjeto && (
        <span className="text-red-600">{errors.descripcionObjeto.message}</span>
      )}

      <div className="flex gap-2">
        <div className="flex-1">
          <label>Tamaño</label>
          <input
            {...register("tamaño")}
            className="border rounded px-3 py-2 w-full"
          />
          {errors.tamaño && (
            <span className="text-red-600">{errors.tamaño.message}</span>
          )}
        </div>
        <div className="flex-1">
          <label>Unidad de Tamaño</label>
          <select
            {...register("unidadMedidaTamaño")}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Seleccione</option>
            {unidadesTamaño.map((u) => (
              <option key={u.idCatalogo} value={u.idCatalogo}>
                {u.descripcion}
              </option>
            ))}
          </select>
          {errors.unidadMedidaTamaño && (
            <span className="text-red-600">
              {errors.unidadMedidaTamaño.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label>Peso</label>
          <input
            {...register("peso")}
            className="border rounded px-3 py-2 w-full"
          />
          {errors.peso && (
            <span className="text-red-600">{errors.peso.message}</span>
          )}
        </div>
        <div className="flex-1">
          <label>Unidad de Peso</label>
          <select
            {...register("unidadMedidaPeso")}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Seleccione</option>
            {unidadesPeso.map((u) => (
              <option key={u.idCatalogo} value={u.idCatalogo}>
                {u.descripcion}
              </option>
            ))}
          </select>
          {errors.unidadMedidaPeso && (
            <span className="text-red-600">
              {errors.unidadMedidaPeso.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <label>Color</label>
        <select
          {...register("color")}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">Seleccione</option>
          {colores.map((c) => (
            <option key={c.idCatalogo} value={c.idCatalogo}>
              {c.descripcion}
            </option>
          ))}
        </select>
        {errors.color && (
          <span className="text-red-600">{errors.color.message}</span>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cerrar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
        >
          {indicioSeleccionado ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}
