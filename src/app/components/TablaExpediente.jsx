import React, { useState, useMemo } from "react";
import { formatDateTime } from "../utils/DateUtils.js";
import { FiEye, FiPlus, FiTrash } from "react-icons/fi";
import DetalleExpediente from "./DetalleExpediente.jsx";
import Modal from "./Modal.jsx";
import Swal from "sweetalert2";

export default function TablaExpedientes({ datos = [], onCloseDetalle }) {
  const [filtroTexto, setFiltroTexto] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);

  const handleDetalle = (noExpediente, estado) => {
    setExpedienteSeleccionado(noExpediente);
    setEstadoSeleccionado(estado);
    setModalDetalleOpen(true);
  };

  const handleJustificacion = (justificacion) => {
    Swal.fire({
      title: "Justificación del rechazo",
      text: justificacion,
      icon: "info",
    });
  }
  const itemsFiltrados = useMemo(() => {
    const texto = filtroTexto.toLowerCase();
    return datos.filter(
      (item) =>
        (item.descripcion || "").toLowerCase().includes(texto) ||
        (item.noExpediente || "").toString().toLowerCase().includes(texto) ||
        (item.estado || "").toLowerCase().includes(texto) ||
        (item.nombre || "").toLowerCase().includes(texto) ||
        (item.fechaCreo
          ? item.fechaCreo.toLocaleString().toLowerCase()
          : ""
        ).includes(texto) ||
        (item.nombreAprobo || "").toLowerCase().includes(texto) ||
        (item.fechaRev
          ? item.fechaRev.toLocaleString().toLowerCase()
          : ""
        ).includes(texto)
    );
  }, [datos, filtroTexto]);

  const totalPaginas = Math.ceil(itemsFiltrados.length / registrosPorPagina);
  const itemsPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * registrosPorPagina;
    return itemsFiltrados.slice(inicio, inicio + registrosPorPagina);
  }, [itemsFiltrados, paginaActual]);

  const limpiarFiltros = () => {
    setFiltroTexto("");
    setPaginaActual(1);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Buscar por expediente, estado, descripción o usuario..."
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
          className="border rounded px-3 py-2 flex-1 min-w-[250px]"
        />
        <button
          type="button"
          onClick={limpiarFiltros}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center gap-2"
        >
          <FiTrash />
          Limpiar filtros
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">No Expediente</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">Usuario Creo</th>
              <th className="px-4 py-2 text-left">Fecha Creación</th>
              <th className="px-4 py-2 text-left">Usuario Reviso</th>
              <th className="px-4 py-2 text-left">Fecha Revisión</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {itemsPaginados.map((item) => (
              <tr key={item.no_expediente} className="hover:bg-gray-50">
                <td className="px-4 py-2">{item.noExpediente}</td>
                <td className="px-4 py-2">{item.estado}</td>
                <td className="px-4 py-2">{item.descripcion}</td>
                <td className="px-4 py-2">{item.nombre}</td>
                <td className="px-4 py-2">{formatDateTime(item.fechaCreo)}</td>
                <td className="px-4 py-2">{item.nombreAprobo || "-"}</td>
                <td className="px-4 py-2">
                  {formatDateTime(item.fechaRev) || "-"}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                      onClick={() =>
                        handleDetalle(item.noExpediente, item.estado)
                      }
                    >
                      <FiEye /> Detalle
                    </button>
                {item.estado=== 'Expediente Rechazado' && (
                    <button
                      type="button"
                      className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
                      onClick={() => handleJustificacion(item.justificacion)}
                    >
                      <FiEye /> justificación
                    </button>
                )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              paginaActual === i + 1
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setPaginaActual(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {modalDetalleOpen && (
        <Modal
          onClose={() => {
            setModalDetalleOpen(false);
            onCloseDetalle?.();
          }}
        >
          <DetalleExpediente
            onClose={() => {
              setModalDetalleOpen(false);
              onCloseDetalle?.();
            }}
            noExpediente={expedienteSeleccionado}
            estado={estadoSeleccionado}
          />
        </Modal>
      )}
    </div>
  );
}
