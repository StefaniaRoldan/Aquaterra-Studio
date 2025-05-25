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

  return (
    <ReservaContext.Provider value={{ reservas, reservar }}>
      {children}
    </ReservaContext.Provider>
  );
}
