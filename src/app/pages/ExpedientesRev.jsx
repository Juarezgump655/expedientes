import React from "react";
import { useEffect, useState } from "react";
import { getExpedientesForRevision } from "../services/expedientes.service.js";
import TablaExpedientes from "../components/TablaExpediente.jsx";
import { FiPlus } from "react-icons/fi";

export default function ExpedientesRev() {
  const [expedientes, setExpedientes] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const data = await getExpedientesForRevision();
      const dataConFechas = transformarFechas(data);
      setExpedientes(dataConFechas);
    } catch (error) {
      console.error(error);
    }
  };


    const transformarFechas = (expedientes) => {
    return expedientes.map((item) => ({
      ...item,
      fechaCreo: item.fechaCreo ? new Date(item.fechaCreo) : null,
      fechaRev: item.fechaRev ? new Date(item.fechaRev) : null,
    }));
  };


  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold">Expedientes para Revisión</h1>
      </div>
      <TablaExpedientes
        datos={expedientes}
        onCloseDetalle={() => cargarDatos()}
      />
    </div>
  );
}
