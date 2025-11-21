import React, { useState, useEffect } from "react";

const Home = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [showName, setShowName] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);

     getNombreUsuario();
    return () => clearTimeout(timer);
  }, []);


  const  getNombreUsuario = async() => {
    const nombreUsuario = localStorage.getItem("nombre");
    setShowName(nombreUsuario);
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {showMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-center px-6 py-3 rounded-lg shadow-lg animate-fade-in-out z-50">
          ¡Bienvenido al Sistema DICRI!
        </div>
      )}

      <div className="flex flex-col items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/24/MP_logo.png"
          alt="MP Logo"
          className="w-32 h-32 drop-shadow-md"
        />
        <h1 className="text-gray-700 text-2xl font-bold max-w-xl leading-snug">
          Bienvenido al Sistema de Gestión de Expedientes de la Dirección de
          Investigación Criminalística
          {showName ? ` ${showName}` : ""}
        </h1>
      </div>
    </div>
  );
};

export default Home;
