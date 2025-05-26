import { useContext } from "react";
import { ReservaContext } from "./ReservaContext";

// Simulamos las clases disponibles
const clases = [
  { id: 1, dia: "Lunes", hora: "08:00", tipo: "Reformer" },
  { id: 2, dia: "Lunes", hora: "09:00", tipo: "Reformer" },
  { id: 3, dia: "Lunes", hora: "10:00", tipo: "Reformer" },
  { id: 4, dia: "Lunes", hora: "11:00", tipo: "Reformer" },
  { id: 5, dia: "Lunes", hora: "15:00", tipo: "Reformer" },
  { id: 6, dia: "Lunes", hora: "16:00", tipo: "Reformer" },
  { id: 7, dia: "Lunes", hora: "17:00", tipo: "Reformer" },
  { id: 8, dia: "Lunes", hora: "18:00", tipo: "Reformer" },
  { id: 9, dia: "Lunes", hora: "20:00", tipo: "Reformer" },
];

function ReservasConfirmadas() {
  const { reservas, cancelarReserva } = useContext(ReservaContext);
  const clasesReservadas = clases.filter((clase) => reservas.includes(clase.id));

  if (clasesReservadas.length === 0) {
    return <p>No tenés clases reservadas.</p>;
  }

  return (
    <div>
      <h3>Mis clases reservadas:</h3>
      <ul>
        {clasesReservadas.map((clase) => (
          <li key={clase.id}>
            {clase.dia} - {clase.hora} - {clase.tipo}
            <button onClick={() => cancelarReserva(clase.id)} style={{ marginLeft: '1rem' }}>
              Cancelar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservasConfirmadas;