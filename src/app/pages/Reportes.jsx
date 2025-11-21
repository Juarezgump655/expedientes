import React, { useState, useMemo } from "react";
import { buscarExpedientesPorFecha } from "../services/expedientes.service.js";
import { formatDateTime } from "../utils/DateUtils.js";
import { FiTrash, FiSearch } from "react-icons/fi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { mostrarAlerta } from "../utils/alerUtil.js";
import { FiDownload } from "react-icons/fi";

export default function Reportes() {
  const [fechaInicioCrea, setFechaInicioCrea] = useState("");
  const [fechaFinCrea, setFechaFinCrea] = useState("");
  const [fechaInicioRev, setFechaInicioRev] = useState("");
  const [fechaFinRev, setFechaFinRev] = useState("");
  const [expedientes, setExpedientes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filtroTexto, setFiltroTexto] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  const itemsFiltrados = useMemo(() => {
    if (!Array.isArray(expedientes)) return [];
    const texto = filtroTexto.toLowerCase();

    return expedientes.filter((item) => {
      return (
        (item.descripcion || "").toLowerCase().includes(texto) ||
        (item.noExpediente || "").toString().toLowerCase().includes(texto) ||
        (item.estado || "").toLowerCase().includes(texto) ||
        (item.nombre || "").toLowerCase().includes(texto) ||
        (item.nombreAprobo || "").toLowerCase().includes(texto) ||
        (item.fechaCreo
          ? item.fechaCreo.toString().toLowerCase()
          : ""
        ).includes(texto) ||
        (item.fechaRev ? item.fechaRev.toString().toLowerCase() : "").includes(
          texto
        )
      );
    });
  }, [expedientes, filtroTexto]);

  const exportarExcel = () => {
    if (!itemsFiltrados || itemsFiltrados.length === 0) {
      mostrarAlerta("info", "Información", "No hay datos para exportar");
      return;
    }
    const hoja = XLSX.utils.json_to_sheet(itemsFiltrados);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Datos");
    const excelBuffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
    const archivo = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(archivo, "reporte_filtrado.xlsx");
  };

  const totalPaginas = Math.ceil(itemsFiltrados.length / registrosPorPagina);

  const itemsPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * registrosPorPagina;
    return itemsFiltrados.slice(inicio, inicio + registrosPorPagina);
  }, [itemsFiltrados, paginaActual]);

  const buscar = async () => {
    setLoading(true);

    const body = {
      fechaInicioCrea: fechaInicioCrea || null,
      fechaFinCrea: fechaFinCrea || null,
      fechaInicioRev: fechaInicioRev || null,
      fechaFinRev: fechaFinRev || null,
    };
    try {
      const data = await buscarExpedientesPorFecha(body);
      setExpedientes(transformarFechas(data));
      console.log("Expedientes encontrados:", data);
      setPaginaActual(1);
      setLoading(false);
    } catch (error) {
      console.error("Error al buscar expedientes:", error);
      setLoading(false);
    }
  };

  const limpiarFiltros = () => {
    setFiltroTexto("");
    setFechaInicioCrea("");
    setFechaFinCrea("");
    setFechaInicioRev("");
    setFechaFinRev("");
    setExpedientes([]);
    setPaginaActual(1);
  };

  const transformarFechas = (expedientes) => {
    return expedientes.map((item) => ({
      ...item,
      fechaCreo: item.fechaCreo ? new Date(item.fechaCreo) : null,
      fechaRev: item.fechaRev ? new Date(item.fechaRev) : null,
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Buscar Expedientes por Fecha</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">
        <div>
          <h3 className="text-lg font-semibold mb-2">Fecha de Creación</h3>

          <label className="block text-sm font-medium">Inicio</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={fechaInicioCrea}
            onChange={(e) => setFechaInicioCrea(e.target.value)}
          />

          <label className="block text-sm font-medium mt-2">Fin</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={fechaFinCrea}
            onChange={(e) => setFechaFinCrea(e.target.value)}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Fecha de Revisión</h3>

          <label className="block text-sm font-medium">Inicio</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={fechaInicioRev}
            onChange={(e) => setFechaInicioRev(e.target.value)}
          />

          <label className="block text-sm font-medium mt-2">Fin</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={fechaFinRev}
            onChange={(e) => setFechaFinRev(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={buscar}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          disabled={loading}
        >
          <FiSearch className="text-lg" />
          {loading ? "Buscando..." : "Buscar"}
        </button>

        <button
          onClick={limpiarFiltros}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
        >
          <FiTrash className="text-lg" />
          Limpiar
        </button>
        <button
          onClick={exportarExcel}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          <FiDownload className="text-lg" />
          Exportar Excel
        </button>
      </div>

      <div className="mt-6">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Buscar por texto..."
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
        />
      </div>

      <div className="mt-8 bg-white p-6 shadow rounded-xl">
        <h3 className="text-xl font-bold mb-4">Resultados</h3>

        {!Array.isArray(itemsPaginados) || itemsPaginados.length === 0 ? (
          <p className="text-gray-500">No hay resultados</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Expediente</th>
                <th className="border p-2">Estado</th>
                <th className="border p-2">Descripción</th>
                <th className="border p-2">Usuario Aprueba</th>
                <th className="border p-2">Fecha Revisión</th>
                <th className="border p-2">Fecha Creación</th>
                <th className="border p-2">Justificación</th>
              </tr>
            </thead>

            <tbody>
              {itemsPaginados.map((exp) => (
                <tr key={exp.noExpediente} className="hover:bg-gray-100">
                  <td className="border p-2">{exp.noExpediente}</td>
                  <td className="border p-2">{exp.estado}</td>
                  <td className="border p-2">{exp.descripcion}</td>
                  <td className="border p-2">{exp.nombreAprobo || "—"}</td>
                  <td className="border p-2">
                    {formatDateTime(exp.fechaRev) || "—"}
                  </td>
                  <td className="border p-2">
                    {formatDateTime(exp.fechaCreo) || "—"}
                  </td>
                  <td className="border p-2">{exp.justificacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {totalPaginas > 1 && (
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
        )}
      </div>
    </div>
  );
}
