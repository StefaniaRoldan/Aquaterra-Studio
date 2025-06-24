import { useContext } from "react";
import { ReservaContext } from "./ReservaContext";

function ReservasConfirmadas() {
  const { reservas, clases, cancelarReserva } = useContext(ReservaContext);
  const clasesReservadas = clases.filter((clase) => reservas.includes(clase.id));

  if (clasesReservadas.length === 0) {
    return <p>No tenés clases reservadas.</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h3 style={{ color: "#2a7a7b", marginBottom: "1rem" }}>Mis clases reservadas:</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {clasesReservadas.map((clase) => (
          <li
            key={clase.id}
            style={{
              backgroundColor: "#e6f2f2",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#006666",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div>
              <strong>{clase.tipo}</strong> <br />
              {clase.dia} - {clase.hora}
            </div>
            <button
              onClick={() => cancelarReserva(clase.id)}
              style={{
                backgroundColor: "#A0C9B4",
                border: "none",
                borderRadius: "6px",
                color: "white",
                padding: "6px 12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Cancelar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservasConfirmadas;
