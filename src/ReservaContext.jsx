import { createContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const ReservaContext = createContext();

export function ReservaProvider({ children }) {
  const [reservas, setReservas] = useState([]);
  const [clases, setClases] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);

  // Cargar clases desde Firestore
  useEffect(() => {
    const cargarClases = async () => {
      try {
        const clasesRef = collection(firestore, "clases");
        const snapshot = await getDocs(clasesRef);
        const clasesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClases(clasesData);
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

  // Reservar clase
  const reservar = async (idClase) => {
    const clase = clases.find((c) => c.id === idClase);
    if (!clase || clase.cupos <= 0) return;

    if (reservas.includes(idClase)) {
      alert("Ya estás reservada en esta clase.");
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      // Guardar reserva en Firestore
      await addDoc(collection(firestore, "reservas"), {
        idClase: clase.id,
        dia: clase.dia,
        hora: clase.hora,
        tipoClase: clase.tipo,
        usuarioId: user?.uid || "desconocido",
        usuarioEmail: user?.email || "sin_email",
        timestamp: new Date(),
      });

      // Actualizar estado local
      setReservas((prev) => [...prev, idClase]);

      const nuevasClases = clases.map((c) =>
        c.id === idClase ? { ...c, cupos: c.cupos - 1 } : c
      );
      setClases(nuevasClases);

      // Actualizar Firestore (cupos -1)
      await updateDoc(doc(firestore, "clases", idClase), {
        cupos: clase.cupos - 1,
      });

      // Agregar notificación
      const nuevaNotificacion = {
        id: Date.now(),
        mensaje: `Nuevo turno reservado: Clase ${idClase}`,
        fecha: new Date().toLocaleString(),
      };
      setNotificaciones((prev) => [nuevaNotificacion, ...prev]);

      alert("Reserva confirmada");
    } catch (error) {
      console.error("Error en la reserva:", error);
      alert("Error al reservar la clase");
    }
  };

  // Cancelar reserva y actualizar cupos en Firestore
  const cancelarReserva = async (idClase) => {
    const confirmacion = confirm("¿Querés cancelar esta reserva?");
    if (!confirmacion) return;

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      // Buscar y eliminar la reserva en Firestore
      const reservasRef = collection(firestore, "reservas");
      const q = query(
        reservasRef,
        where("usuarioId", "==", user?.uid),
        where("idClase", "==", idClase)
      );
      const snapshot = await getDocs(q);
      snapshot.forEach(async (docu) => {
        await deleteDoc(docu.ref);
      });

      // Actualizar cupo en Firestore
      const clase = clases.find((c) => c.id === idClase);
      if (clase) {
        await updateDoc(doc(firestore, "clases", idClase), {
          cupos: clase.cupos + 1,
        });
      }

      // Actualizar estado local
      setReservas((prev) => prev.filter((id) => id !== idClase));
      const nuevasClases = clases.map((c) =>
        c.id === idClase ? { ...c, cupos: c.cupos + 1 } : c
      );
      setClases(nuevasClases);

      // Notificación
      const nuevaNotificacion = {
        id: Date.now(),
        mensaje: `Reserva cancelada: Clase ${idClase}`,
        fecha: new Date().toLocaleString(),
      };
      setNotificaciones((prev) => [nuevaNotificacion, ...prev]);

      alert("Reserva cancelada.");
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      alert("Hubo un problema al cancelar la reserva.");
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
