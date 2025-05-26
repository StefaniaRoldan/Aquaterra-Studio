import { createContext, useState } from "react";

export const ReservaContext = createContext();

export function ReservaProvider({ children }) {
  const [reservas, setReservas] = useState([]);

  const reservar = (idClase) => {
    if (!reservas.includes(idClase)) {
      setReservas([...reservas, idClase]);
      alert("Reserva confirmada 🌿");
    } else {
      alert("Ya estás reservada en esta clase.");
    }
  };

  const cancelarReserva = (idClase) => {
    const confirmacion = confirm("¿Querés cancelar esta reserva?");
    if (confirmacion) {
      setReservas(reservas.filter((id) => id !== idClase));
      alert("Reserva cancelada.");
    }
  };

  return (
    <ReservaContext.Provider value={{ reservas, reservar, cancelarReserva }}>
      {children}
    </ReservaContext.Provider>
  );
}