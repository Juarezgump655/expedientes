import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  descripcion: yup
    .string()
    .max(150, "La descripción no puede superar los 150 caracteres")
    .required("La descripción es obligatoria"),
  fecha: yup.date().required("La fecha es obligatoria"),
});

export default function CrearExpedienteForm({ onSubmit, onClose }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      descripcion: "",
      fecha: new Date().toISOString().slice(0, 10),
    },
  });

  const submit = (data) => {
    onSubmit(data);
  };

  const descripcion = watch("descripcion"); // observar cambios
  const maxLength = 150;
  const handleChange = (e) => {
    const valor = e.target.value;
    if (valor.length <= maxLength) {
      setValue("descripcion", valor); // actualizar valor en react-hook-form
    }
  };

  return (
    <div>
      <div className="px-4 py-2 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold">Crear Expediente</h2>
      </div>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3 p-4">
        <label className="font-medium">Descripción</label>
        <textarea
          {...register("descripcion")}
          value={descripcion}
          onChange={handleChange}
          placeholder="Descripción del expediente"
          className="border rounded px-3 py-2"
        />
        <div className="text-sm text-gray-500">
          {descripcion.length} / {maxLength}
        </div>
        {errors.descripcion && (
          <p className="text-red-500 text-sm">{errors.descripcion.message}</p>
        )}

        <label className="font-medium">Fecha</label>
        <input
          type="date"
          {...register("fecha")}
          className="border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          disabled
        />
        {errors.fecha && (
          <p className="text-red-500 text-sm">{errors.fecha.message}</p>
        )}

        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}
