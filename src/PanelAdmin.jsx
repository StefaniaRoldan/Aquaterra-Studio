import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

export default function PanelAdmin() {
  const [reservasPorUsuario, setReservasPorUsuario] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "reservas"));
        const hoy = new Date();
        const mesActual = hoy.getMonth();
        const anioActual = hoy.getFullYear();

        const agrupadas = {};

        querySnapshot.docs.forEach((doc) => {
          const data = doc.data();
          const fecha = data.timestamp?.toDate?.();
          const mesReserva = fecha?.getMonth();
          const anioReserva = fecha?.getFullYear();

          // Solo incluir reservas del mes actual
          if (mesReserva === mesActual && anioReserva === anioActual) {
            const uid = data.usuarioId;
            if (!agrupadas[uid]) {
              agrupadas[uid] = {
                nombre: data.usuarioNombre || "Sin nombre",
                email: data.usuarioEmail,
                reservas: [],
              };
            }
            agrupadas[uid].reservas.push({
              tipoClase: data.tipoClase,
              dia: data.dia,
              hora: data.hora,
            });
          }
        });

        setReservasPorUsuario(agrupadas);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerReservas();
  }, []);

  return (
    <div style={{ padding: "1rem", maxWidth: 700, margin: "0 auto" }}>
      <h2>Panel de Administración</h2>
      <h3>Reservas por usuario - Máximo 8 por mes</h3>

      {cargando ? (
        <p>Cargando reservas...</p>
      ) : Object.keys(reservasPorUsuario).length === 0 ? (
        <p>No hay reservas aún este mes.</p>
      ) : (
        Object.entries(reservasPorUsuario).map(([uid, usuario]) => (
          <div
            key={uid}
            style={{
              backgroundColor: "#f8f8f8",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              borderLeft:
                usuario.reservas.length >= 8
                  ? "4px solid green"
                  : "4px solid orange",
            }}
          >
            <h4 style={{ marginBottom: "0.3rem" }}>
              {usuario.nombre} ({usuario.email})
            </h4>
            <p style={{ fontWeight: "bold" }}>
              {usuario.reservas.length} / 8 clases reservadas
            </p>
            {usuario.reservas.length >= 8 ? (
              <p style={{ color: "green" }}>✔ Completó sus 8 clases del mes.</p>
            ) : (
              <p style={{ color: "orange" }}>
                ⚠ Le faltan {8 - usuario.reservas.length} clases.
              </p>
            )}
            <ul>
              {usuario.reservas.map((r, i) => (
                <li key={i}>
                  {r.tipoClase} - {r.dia} - {r.hora}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
