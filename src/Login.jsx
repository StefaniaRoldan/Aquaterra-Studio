import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase"; // ajustá el path si es necesario

function Login({ setUsuario, onIrARegistro }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setUsuario({
        uid: user.uid,
        email: user.email,
        nombre: "Usuario", // opcional
        telefono: "",      // opcional
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