import React, { useState, useMemo, useEffect } from "react";
import { formatDateTime } from "../utils/DateUtils.js";
import { FiEye, FiPlus, FiTrash } from "react-icons/fi";
import { getDetalleExpediente } from "../services/detalleExpediente.service";
import CrearIndicioForm from "./CrearIndicio.jsx";
import { FiEdit } from "react-icons/fi";

export default function TablaDetalleExpediente({ noExpediente, estado }) {
  const [indicioSeleccionado, setIndicioSeleccionado] = useState(null);
  const [datos, setDatos] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;
  const [mostrarCrearIndicio, setMostrarCrearIndicio] = useState(false);

  useEffect(() => {
    cargarDatosDetalle();
  }, []);

  const handleModificar = (indicio) => {
    setIndicioSeleccionado(indicio);
    setMostrarCrearIndicio(true);
  };



  const cargarDatosDetalle = async () => {
    try {
      const data = await getDetalleExpediente(noExpediente);
      const dataConFechas = transformarFechas(data);
      setDatos(dataConFechas);
    } catch (error) {
      console.error(error);
    }
  };

  const transformarFechas = (expedientes) => {
    return expedientes.map((item) => ({
      ...item,
      fechaCreo: item.fechaCreacion ? new Date(item.fechaCreacion) : null,
    }));
  };

  const onClose = () => {
    cargarDatosDetalle();
    setMostrarCrearIndicio(false);
  };

  const itemsFiltrados = useMemo(() => {
    const texto = filtroTexto.toLowerCase();
    return (datos || []).filter(
      (item) =>
        (item.descripcionObjeto || "").toLowerCase().includes(texto) ||
        (item.tamaño || "").toString().toLowerCase().includes(texto) ||
        (item.peso || "").toString().toLowerCase().includes(texto) ||
        (item.color || "").toLowerCase().includes(texto) ||
        (item.usuarioCreo || "").toLowerCase().includes(texto) ||
        (item.fechaCreacion
          ? item.fechaCreacion.toLocaleString().toLowerCase()
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
          placeholder="Buscar por Descripcion del Objeto, tamaño, peso, color o usuario..."
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
          className="border rounded px-3 py-2 flex-1 min-w-[250px]"
        />
        {estado && (
          <button
            type="button"
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            onClick={() => setMostrarCrearIndicio(true)}
          >
            <FiPlus />
            Crear Indicio
          </button>
        )}
        <button
          type="button"
          onClick={limpiarFiltros}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center gap-2"
        >
          <FiTrash />
          Limpiar filtros
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Descripcion del Objeto </th>
              <th className="px-4 py-2 text-left">Tamaño</th>
              <th className="px-4 py-2 text-left">Peso</th>
              <th className="px-4 py-2 text-left">Color</th>
              <th className="px-4 py-2 text-left">Usuario Creación</th>
              <th className="px-4 py-2 text-left">Fecha Creación</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {itemsPaginados.map((item) => (
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2">{item.descripcionObjeto}</td>
                <td className="px-4 py-2">{item.tamaño}</td>
                <td className="px-4 py-2">{item.color}</td>
                <td className="px-4 py-2">{item.peso}</td>
                <td className="px-4 py-2">{item.usuarioCreo}</td>
                <td className="px-4 py-2">
                  {formatDateTime(item.fechaCreacion)}
                </td>
                <td className="px-4 py-2">
                  {estado && (
                    <button
                      type="button"
                      className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-1"
                      onClick={() => handleModificar(item)}
                    >
                      <FiEdit /> Modificar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
      {mostrarCrearIndicio && (
        <CrearIndicioForm
          noExpediente={noExpediente}
          indicioSeleccionado={indicioSeleccionado}
          onClose={() => {
            setMostrarCrearIndicio(false);
            setIndicioSeleccionado(null);
            cargarDatosDetalle();
          }}
        />
      )}
    </div>
  );
}
