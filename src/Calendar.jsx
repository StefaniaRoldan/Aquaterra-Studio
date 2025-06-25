import { useContext } from "react";
import { ReservaContext } from "./ReservaContext";

// Orden de los días para ordenar
const ordenDias = {
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sábado: 6,
  Domingo: 7,
};

function Calendar() {
  const { clases, reservar } = useContext(ReservaContext);

  // Filtrar clases válidas
  const clasesValidas = clases.filter(
    (c) =>
      c &&
      typeof c.dia === "string" &&
      typeof c.hora === "string" &&
      typeof c.tipo === "string" &&
      typeof c.cupos === "number"
  );

  // Ordenar por día y luego por hora
  const clasesOrdenadas = [...clasesValidas].sort((a, b) => {
    const diaA = ordenDias[a.dia] || 99;
    const diaB = ordenDias[b.dia] || 99;

    if (diaA !== diaB) return diaA - diaB;

    // Convertir hora a número para comparar (ej. "8:30" -> 8.5)
    const horaA = parseFloat(a.hora.split(":")[0]) + (parseInt(a.hora.split(":")[1]) || 0) / 60;
    const horaB = parseFloat(b.hora.split(":")[0]) + (parseInt(b.hora.split(":")[1]) || 0) / 60;

    return horaA - horaB;
  });

  return (
    <div className="grid">
      {clasesOrdenadas.map((clase) => (
        <div key={clase.id} className="card">
          <div>
            <h3>{clase.tipo}</h3>
            <p>
              {clase.dia} - {clase.hora}
            </p>
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
