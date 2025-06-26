import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";
import NotificacionesAdmin from "./NotificacionesAdmin";

export default function PanelAdmin() {
  const [todasLasReservas, setTodasLasReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerReservas = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "reservas"));
      const reservasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodasLasReservas(reservasData);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const limpiarNotificaciones = () => {
    if (window.confirm("¿Querés eliminar todas las notificaciones?")) {
      console.log("Notificaciones eliminadas");
      // Acá podés agregar la lógica para limpiar en Firestore si querés
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: 700, margin: "0 auto" }}>
      <h2>Panel de Administración</h2>

      <section style={{ marginBottom: "2rem" }}>
        <h3>Reservas actuales</h3>
        {cargando ? (
          <p>Cargando reservas...</p>
        ) : todasLasReservas.length === 0 ? (
          <p>No hay reservas hechas aún.</p>
        ) : (
          <ul>
            {todasLasReservas.map((reserva) => (
              <li key={reserva.id}>
                {reserva.usuarioNombre} - {reserva.usuarioEmail} - {reserva.tipoClase} - {reserva.dia} - {reserva.hora}
              </li>
            ))}
          </ul>
        )}
      </section>

     
    </div>
  );
}