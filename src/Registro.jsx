import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore } from "./firebase"; // ajustá la ruta si es necesario
import { doc, setDoc } from "firebase/firestore";
import "./App.css";
import "./index.css";

function Registro({ setUsuario, volver }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !telefono || !password) {
      alert("Por favor completá todos los campos.");
      return;
    }

    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Actualizar perfil con el nombre en Firebase Auth (displayName)
      await updateProfile(user, { displayName: nombre });

      // 3. Guardar documento en Firestore en la colección 'usuarios'
      await setDoc(doc(firestore, "usuarios", user.uid), {
        nombre,
        telefono,
        rol: "usuario", // rol por defecto
        email,
        createdAt: new Date(),
      });

      // 4. Actualizar estado global con datos del usuario (incluye displayName y nombre Firestore)
      setUsuario({
        uid: user.uid,
        email,
        nombre,
        telefono,
        rol: "usuario",
      });

      alert("Usuario registrado con éxito!");

      // 5. Opcional: volver (cerrar formulario o redirigir)
      if (volver) volver();

    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          alert("Este email ya está registrado. Por favor, iniciá sesión o usá otro email.");
          break;
        case "auth/invalid-email":
          alert("El email ingresado no es válido. Por favor, corregilo.");
          break;
        case "auth/weak-password":
          alert("La contraseña es muy débil. Debe tener al menos 6 caracteres.");
          break;
        default:
          alert(`Error al registrar: ${error.message}`);
      }
    }
  };

  return (
    <div className="registro-container">
      <h1 className="registro-titulo">Crear cuenta</h1>

      <form onSubmit={handleSubmit} className="registro-formulario">
        <label className="registro-label">
          <span>Nombre completo</span>
          <input
            type="text"
            className="registro-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        <label className="registro-label">
          <span>Email</span>
          <input
            type="email"
            className="registro-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="registro-label">
          <span>Teléfono</span>
          <input
            type="tel"
            className="registro-input"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </label>

        <label className="registro-label">
          <span>Contraseña</span>
          <input
            type="password"
            className="registro-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="registro-boton">
          Registrarme
        </button>
      </form>
    </div>
  );
}

export default Registro;
