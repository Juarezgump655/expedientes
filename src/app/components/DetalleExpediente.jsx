import React, { useState, useMemo, useEffect } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import Swal from "sweetalert2";

import {
  actualizarRegistroExpediente,
  revisarExpediente,
} from "../services/expedientes.service.js";
import { mostrarAlerta } from "../utils/alerUtil.js";
import { FiCancel } from "react-icons/fi";

import TablaDetalleExpediente from "./TablaDetalleExpediente.jsx";

const DetalleExpediente = ({ onClose, noExpediente, estado }) => {
  const [tieneRol5, setTieneRol5] = useState(false);
  const mostrarFinalizar = estado === "Expediente Creado";

  const verificarRol = () => {
    const roles = JSON.parse(localStorage.getItem("roles")) || [];
    const tiene = roles.some((r) => r.rol == "5");
    setTieneRol5(tiene);
  };

  useEffect(() => {
    verificarRol();
  }, []);

  const finalizarRegistro = () => {
    actualizarRegistroExpediente(noExpediente)
      .then((res) => {
        mostrarAlerta(
          "success",
          "Éxito",
          "El expediente ha sido finalizado correctamente."
        );
        onClose();
      })
      .catch((err) => {
        console.error("Error al finalizar el expediente:", err);
      });
  };

  const rechazarRegistro = async () => {
    const { value: justificacion } = await Swal.fire({
      title: "Ingrese la justificación",
      input: "textarea",
      inputPlaceholder: "Motivo del rechazo (máx. 300 caracteres)",
      inputAttributes: {
        maxlength: 300,
        rows: 5,
      },
      showCancelButton: true,
      confirmButtonText: "Rechazar expediente",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value || value.trim() === "") {
          return "Debe ingresar una justificación";
        }
        if (value.length > 300) {
          return "Máximo 300 caracteres";
        }
        return null;
      },
    });
    if (!justificacion) return;

    const data = {
      noExpediente: noExpediente,
      estado: 17,
      justificacion: justificacion,
    };
    

    revisarExpediente(data)
      .then((res) => {
        mostrarAlerta(
          "success",
          "Éxito",
          "El expediente ha sido rechazado correctamente."
        );
        onClose();
      })
      .catch((err) => {
        console.error("Error al rechazar el expediente:", err);
      });
  };

 const  aprobarRegistro = () => {
    const data = {
      noExpediente: noExpediente,
      estado: 3,
      justificacion: "",
    };
    revisarExpediente(data)
      .then((res) => {
        mostrarAlerta(
          "success",  
          "Éxito",
          "El expediente ha sido aprobado correctamente."
        );
        onClose();
      })
      .catch((err) => {
        console.error("Error al aprobar el expediente:", err);
      });
  };

  return (
    <div>
      <div className="px-4 py-2 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold">
          Detalle del Expediente {noExpediente}
        </h2>
      </div>
      <TablaDetalleExpediente
        noExpediente={noExpediente}
        estado={mostrarFinalizar}
      />

      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 flex items-center gap-2"
        >
          <FiX />
          Cancelar
        </button>

        {mostrarFinalizar && (
          <button
            type="button"
            onClick={finalizarRegistro}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <FiCheck />
            Finalizar Registro
          </button>
        )}
        {tieneRol5 && (
          <button
            type="button"
            onClick={aprobarRegistro}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <FiCheck />
            Aprobar Expediente
          </button>
        )}
        {tieneRol5 && (
          <button
            type="button"
            onClick={rechazarRegistro}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <FiX />
            Rechazar Expediente
          </button>
        )}
      </div>
    </div>
  );
};

export default DetalleExpediente;
