import React, { useEffect, useState } from "react";
import { getExpedientes } from "../services/expedientes.service.js";
import TablaExpedientes from "../components/TablaExpediente.jsx";
import { FiPlus } from "react-icons/fi";
import Modal from "../components/Modal.jsx";
import CrearExpedienteForm from "../components/CrearExpediente.jsx";
import { crearExpediente } from "../services/expedientes.service.js";
import { mostrarAlerta } from "../utils/alerUtil.js";
export default function Expedientes() {
  const [expedientes, setExpedientes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCrear = () => setModalOpen(true);
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const data = await getExpedientes();
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

  const handleSubmit = (data) => {
    crearExpediente(data)
      .then(() => {
        cargarDatos();
        mostrarAlerta("success", "Éxito", "Expediente creado correctamente");
      })
      .catch((error) => {})
      .finally(() => {
        setModalOpen(false);
      });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold">Expedientes</h1>
        <button
          type="button"
          className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          onClick={handleCrear}
        >
          <FiPlus />
          Crear Expediente
        </button>
      </div>
      <TablaExpedientes
        datos={expedientes}
        onCloseDetalle={() => cargarDatos()} 
      />

      {modalOpen && (
        <Modal
          onClose={() => {
            setModalOpen(false);
          }}
        >
          <CrearExpedienteForm
            onSubmit={handleSubmit}
            onClose={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
