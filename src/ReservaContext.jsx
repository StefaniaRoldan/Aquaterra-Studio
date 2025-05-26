import { createContext, useState, useEffect } from "react";

export const ReservaContext = createContext();

export function ReservaProvider({ children }) {
  const [reservas, setReservas] = useState([]);
  const [clases, setClases] = useState([]);

  useEffect(() => {
    const cargarClases = async () => {
      try {
        const res = await fetch("/api/clases");
        const data = await res.json();
        setClases(data);
      } catch (error) {
        console.error("Error al cargar clases:", error);
      }
    };

    cargarClases();
  }, []);

  const reservar = async (idClase) => {
    const clase = clases.find((c) => c.id === idClase);
    if (!clase || clase.cupos <= 0) return;

    if (reservas.includes(idClase)) {
      alert("Ya estás reservada en esta clase.");
      return;
    }

    try {
      const res = await fetch('/api/reservar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idClase }),
      });
      const data = await res.json();

      if (res.ok) {
        setReservas([...reservas, idClase]);

        const nuevasClases = clases.map((c) =>
          c.id === idClase ? { ...c, cupos: c.cupos - 1 } : c
        );
        setClases(nuevasClases);

        alert(data.message); // mensaje del mock, ej: "Reserva confirmada para clase 1"
      } else {
        alert("Error al reservar la clase");
      }
    } catch (error) {
      console.error("Error en la reserva:", error);
      alert("Error al reservar la clase");
    }
  };

  const cancelarReserva = (idClase) => {
    const confirmacion = confirm("¿Querés cancelar esta reserva?");
    if (confirmacion) {
      setReservas(reservas.filter((id) => id !== idClase));

      const nuevasClases = clases.map((c) =>
        c.id === idClase ? { ...c, cupos: c.cupos + 1 } : c
      );
      setClases(nuevasClases);

      alert("Reserva cancelada.");
    }
  };

  return (
    <ReservaContext.Provider
      value={{ reservas, clases, reservar, cancelarReserva }}
    >
      {children}
    </ReservaContext.Provider>
  );
}