import React from "react";

export default function Navbar({ toggleSidebar }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white shadow-md">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="text-gray-300 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
