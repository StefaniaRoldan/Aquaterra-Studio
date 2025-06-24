import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, firestore } from "./firebase"; // importa firestore además de auth
import { doc, getDoc } from "firebase/firestore";

function Login({ setUsuario, onIrARegistro }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Traer rol desde Firestore
      const usuarioDoc = doc(firestore, "usuarios", user.uid);
      const usuarioSnap = await getDoc(usuarioDoc);

      let rol = "usuario"; // valor por defecto
      if (usuarioSnap.exists()) {
        rol = usuarioSnap.data().rol || "usuario";
      }

      setUsuario({
        uid: user.uid,
        email: user.email,
        nombre: usuarioSnap.exists() ? usuarioSnap.data().nombre || "Usuario" : "Usuario",
        telefono: usuarioSnap.exists() ? usuarioSnap.data().telefono || "" : "",
        rol,
      });

      alert("¡Sesión iniciada con éxito!");
    } catch (error) {
      alert("Usuario o contraseña incorrectos");
      console.error(error);
    }
  };

  const handleRecupero = async () => {
    if (!email) {
      alert("Por favor, ingresa tu email para recuperar la contraseña.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Email de recuperación enviado. Revisa tu bandeja de entrada.");
    } catch (error) {
      alert("Error al enviar el email de recuperación: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-titulo">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="login-formulario">
        <label className="login-label">
          <span>Email</span>
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="login-label">
          <span>Contraseña</span>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="login-boton">Entrar</button>
        <button
          type="button"
          onClick={handleRecupero}
          className="login-crear-cuenta"
          style={{ marginTop: "10px", background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </form>
    </div>
  );
}

export default Login;