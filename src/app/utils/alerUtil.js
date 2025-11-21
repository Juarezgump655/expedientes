import Swal from "sweetalert2";

export const mostrarAlerta = (icon, title, mensaje) => {

  Swal.fire({
    icon: icon,
    title : title,
    text: mensaje,
  });
};