import { useContext } from "react";
import { ReservaContext } from "./ReservaContext";

function Calendar() {
  const { clases, reservar } = useContext(ReservaContext);

  return (
    <div className="grid">
      {clases.map((clase) => (
        <div key={clase.id} className="card">
          <div>
            <h3>{clase.tipo}</h3>
            <p>{clase.dia} - {clase.hora}</p>
            <p>Cupos: {clase.cupos > 0 ? clase.cupos : "Sin lugar"}</p>
          </div>
          <button
            disabled={clase.cupos === 0}
            onClick={() => reservar(clase.id)}
          >
            Reservar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Calendar;