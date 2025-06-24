import { createContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const ReservaContext = createContext();

export function ReservaProvider({ children }) {
  const [reservas, setReservas] = useState([]);
  const [clases, setClases] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);

  // Cargar clases desde el mock
  useEffect(() => {
    const cargarClases = async () => {
      try {
        const res = await fetch("/api/clases");
        const data = await res.json();
        setClases(data);
      } catch (error) {
        console.error("Error al cargar clases:", error);
      }
    };

    cargarClases();
  }, []);

  // Cargar reservas del usuario desde Firestore
  useEffect(() => {
    const auth = getAuth();

    const desuscribir = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const reservasRef = collection(firestore, "reservas");
          const q = query(reservasRef, where("usuarioId", "==", user.uid));
          const snapshot = await getDocs(q);
          const idsReservas = snapshot.docs.map((doc) => doc.data().idClase);
          setReservas(idsReservas);
        } catch (error) {
          console.error("Error al cargar reservas del usuario:", error);
        }
      } else {
        setReservas([]);
      }
    });

    return () => desuscribir();
  }, []);

  const reservar = async (idClase) => {
    const clase = clases.find((c) => c.id === idClase);
    if (!clase || clase.cupos <= 0) return;

    if (reservas.includes(idClase)) {
      alert("Ya estás reservada en esta clase.");
      return;
    }

    try {
      const res = await fetch("/api/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idClase }),
      });
      const data = await res.json();

      if (res.ok) {
        setReservas((prev) => [...prev, idClase]);

        const nuevasClases = clases.map((c) =>
          c.id === idClase ? { ...c, cupos: c.cupos - 1 } : c
        );
        setClases(nuevasClases);

        const nuevaNotificacion = {
          id: Date.now(),
          mensaje: `Nuevo turno reservado: Clase ${idClase}`,
          fecha: new Date().toLocaleString(),
        };
        setNotificaciones((prev) => [nuevaNotificacion, ...prev]);

        // Guardar reserva en Firestore
        const auth = getAuth();
        const user = auth.currentUser;

        await addDoc(collection(firestore, "reservas"), {
          idClase: clase.id,
          dia: clase.dia,
          hora: clase.hora,
          tipoClase: clase.tipo,
          usuarioId: user?.uid || "desconocido",
          usuarioEmail: user?.email || "sin_email",
          timestamp: new Date(),
        });

        alert(data.message);
      } else {
        alert(data.message || "Error al reservar la clase");
      }
    } catch (error) {
      console.error("Error en la reserva:", error);
      alert("Error al reservar la clase");
    }
  };

  const cancelarReserva = (idClase) => {
    const confirmacion = confirm("¿Querés cancelar esta reserva?");
    if (confirmacion) {
      setReservas(reservas.filter((id) => id !== idClase));

      const nuevasClases = clases.map((c) =>
        c.id === idClase ? { ...c, cupos: c.cupos + 1 } : c
      );
      setClases(nuevasClases);

      alert("Reserva cancelada.");
    }
  };

  return (
    <ReservaContext.Provider
      value={{
        reservas,
        clases,
        reservar,
        cancelarReserva,
        notificaciones,
        setNotificaciones,
      }}
    >
      {children}
    </ReservaContext.Provider>
  );
}