import { useContext } from "react";
import { ReservaContext } from "./ReservaContext";

const clases = [
  { id: 1, dia: "Lunes", hora: "08:00", tipo: "Reformer", cupos: 3 },
  { id: 2, dia: "Lunes", hora: "09:00", tipo: "Reformer", cupos: 3},
  { id: 3, dia: "Lunes", hora: "10:00", tipo: "Reformer", cupos: 3},
  { id: 4, dia: "Lunes", hora: "11:00", tipo: "Reformer", cupos: 3},
  { id: 5, dia: "Lunes", hora: "15:00", tipo: "Reformer", cupos: 3},
  { id: 6, dia: "Lunes", hora: "16:00", tipo: "Reformer", cupos: 3},
  { id: 7, dia: "Lunes", hora: "17:00", tipo: "Reformer", cupos: 3},
  { id: 8, dia: "Lunes", hora: "18:00", tipo: "Reformer", cupos: 3},
  { id:9, dia:"Lunes",hora:"20:00",tipo:"Reformer",cupos:3},
  
  
];

function Calendar() {
  const { reservar } = useContext(ReservaContext);

  return (
    <div className="grid gap-4">
      {clases.map((clase) => (
        <div
          key={clase.id}
          className="p-4 rounded-xl shadow bg-white flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{clase.tipo}</h3>
            <p className="text-sm">{clase.dia} - {clase.hora}</p>
            <p className="text-sm">
              Cupos: {clase.cupos > 0 ? clase.cupos : "Sin lugar"}
            </p>
          </div>
          <button
            disabled={clase.cupos === 0}
            onClick={() => reservar(clase.id)}
            className={`px-4 py-2 rounded ${
              clase.cupos === 0
                ? "bg-gray-300 text-gray-500"
                : "bg-teal-400 text-white hover:bg-teal-500"
            }`}
          >
            Reservar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Calendar;