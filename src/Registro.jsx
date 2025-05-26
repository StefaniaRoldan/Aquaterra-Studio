import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // ajustá la ruta si es necesario

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setUsuario({ uid: user.uid, email: user.email, nombre, telefono });
      alert("Usuario registrado con éxito!");
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
          />
        </label>

        <label className="registro-label">
          <span>Email</span>
          <input
            type="email"
            className="registro-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="registro-label">
          <span>Teléfono</span>
          <input
            type="tel"
            className="registro-input"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </label>

        <label className="registro-label">
          <span>Contraseña</span>
          <input
            type="password"
            className="registro-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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