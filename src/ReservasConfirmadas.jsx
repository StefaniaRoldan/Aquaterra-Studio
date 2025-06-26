import { useContext } from "react";
import { ReservaContext } from "./ReservaContext";

function ReservasConfirmadas() {
  const { reservas, clases, cancelarReserva } = useContext(ReservaContext);

  // Filtrar clases reservadas
  const clasesReservadas = clases.filter((clase) => reservas.includes(clase.id));

  // Calcular clases por mes
  const totalDelMes = clasesReservadas.length;
  const limiteMensual = 8;
  const faltan = Math.max(limiteMensual - totalDelMes, 0);

  if (clasesReservadas.length === 0) {
    return <p>No tenés clases reservadas.</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h3 style={{ color: "#2a7a7b", marginBottom: "1rem" }}>Mis clases reservadas:</h3>

      {/* ✅ Resumen */}
      <div
        style={{
          backgroundColor: "#f0f8f8",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem",
          color: "#004c4c",
        }}
      >
        <p>
          Reservaste <strong>{totalDelMes}</strong> de <strong>{limiteMensual}</strong> clases este mes.
        </p>
        {faltan === 0 ? (
          <p style={{ color: "green", fontWeight: "bold" }}>
            ¡Completaste tus 8 clases del mes! 🙌
          </p>
        ) : (
          <p>Te faltan <strong>{faltan}</strong> clases para completar el mes.</p>
        )}
      </div>

      {/* Lista de clases */}
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
