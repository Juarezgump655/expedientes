import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ isSidebarOpen, isMobile }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Leer roles y pantallas del localStorage
  const roles = JSON.parse(localStorage.getItem("roles")) || [];
  const pantallas = JSON.parse(localStorage.getItem("pantallas")) || [];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside
      className={`bg-gray-900 text-white w-64 p-4 flex flex-col justify-between
        ${isMobile ? "fixed top-0 left-0 bottom-0" : "h-full"} 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300
      `}
    >
      <div>
        <h2 className="text-xl font-bold mb-4">Menú</h2>

        <nav className="space-y-2">
          {pantallas.map((pantalla) => (
            <Link
              key={pantalla.path}
              to={pantalla.path}
              className={`block p-2 rounded hover:bg-gray-700 ${
                location.pathname === pantalla.path ? "bg-gray-700" : ""
              }`}
            >
              {pantalla.name}
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="w-full text-left p-2 rounded hover:bg-red-600 mt-4"
      >
        Cerrar Sesión
      </button>
    </aside>
  );
}
