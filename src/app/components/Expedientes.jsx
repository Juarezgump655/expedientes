import React, { useEffect, useState } from "react";
import { getExpedientes } from "../services/expedientes.service";
import { formatDateTime } from "../utils/DateUtils.js";

export default function Expedientes() {
  const [expedientes, setExpedientes] = useState([]);
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const data = await getExpedientes();
      setExpedientes(data);
    } catch (error) {
      console.error("Error cargando expedientes:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Expedientes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                No Expediente
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Estado
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Descripción
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Justificación Rechazo
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Usuario Reviso
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Fecha Reviso
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Usuario Creo
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Fecha Creación
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expedientes.map((item) => (
              <tr key={item.no_expediente} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.no_expediente}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.estado}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.descripcion}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.just_rechazo}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.usuario_aprobo}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {formatDateTime(item.fecha_probo)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.usuario_creo}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {formatDateTime(item.fecha_creacion)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
