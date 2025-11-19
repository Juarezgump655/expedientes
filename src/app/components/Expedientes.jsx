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
    <div>
      <h1>Expedientes</h1>
      <table>
        <thead>
          <tr>
            <th>No Expediente</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Justificación Rechazo</th>
            <th>Usuario Reviso</th>
            <th>Fecha Reviso</th>
            <th>Usuario Creo</th>
            <th>Fecha Creación</th>
          </tr>
        </thead>
        <tbody>
          {expedientes.map((item) => (
            <tr key={item.no_expediente}>
              <td>{item.no_expediente}</td>
              <td>{item.estado}</td>
              <td>{item.descripcion}</td>
              <td>{item.just_rechazo}</td>
              <td>{item.usuario_aprobo}</td>
              <td>{formatDateTime(item.fecha_probo)}</td>
              <td>{item.usuario_creo}</td>
              <td>{formatDateTime(item.fecha_creacion)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
