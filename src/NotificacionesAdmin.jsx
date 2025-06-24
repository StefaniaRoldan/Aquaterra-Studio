import { useContext } from "react";
import { ReservaContext } from "./ReservaContext";

export default function NotificacionesAdmin() {
  const { notificaciones, setNotificaciones } = useContext(ReservaContext);

  // Para poder modificar las notificaciones, necesitamos exponer setNotificaciones en el contexto.
  // Por ahora, si no está expuesto, dejamos solo mostrar.

  if (!notificaciones || notificaciones.length === 0) {
    return <div>No hay notificaciones nuevas.</div>;
  }

  return (
    <div className="notificaciones-admin">
      <h3>Notificaciones de reservas</h3>
      <ul>
        {notificaciones.map(({ id, mensaje, fecha }) => (
          <li key={id}>
            <strong>{fecha}:</strong> {mensaje}
          </li>
        ))}
      </ul>
    </div>
  );
}