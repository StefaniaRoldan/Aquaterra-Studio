import { useContext } from "react";
import { ReservaContext } from "./ReservaContext";

function ReservasConfirmadas() {
  const { reservas, clases, cancelarReserva } = useContext(ReservaContext);
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