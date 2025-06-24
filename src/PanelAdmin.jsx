import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase"; // asegurate que esté bien la ruta
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
      // Podés agregar lógica para limpiar de Firestore también si querés
      console.log("Notificaciones eliminadas");
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
                {reserva.usuarioEmail || reserva.usuarioId} - {reserva.tipoClase} - {reserva.dia} a las {reserva.hora}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>Notificaciones</h3>
        <button onClick={limpiarNotificaciones} style={{ marginBottom: "1rem" }}>
          Limpiar todas las notificaciones
        </button>
        <NotificacionesAdmin />
      </section>
    </div>
  );
}