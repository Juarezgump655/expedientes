import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
      onClick={onClose} // cerrar al hacer click fuera del modal
    >
      <div
        className="
          bg-white rounded-lg shadow-lg
          w-full sm:max-w-md md:max-w-2xl lg:max-w-4xl
          max-h-[90vh] overflow-y-auto
          transform transition-transform duration-300 scale-95
          sm:scale-100
        "
        onClick={(e) => e.stopPropagation()} // evita cerrar al click dentro
      >
        {children}
      </div>
    </div>
  );
}
