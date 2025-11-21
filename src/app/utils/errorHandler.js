import Swal from "sweetalert2";

export const manejarError = (error, mensaje) => {
  console.error(error);

  Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
  });
};