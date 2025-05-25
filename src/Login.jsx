import { useState } from "react";

function Login({ onLogin, onIrARegistro }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "usuario@aquaterra.com" && password === "123456") {
      onLogin(email);
    } else {
      alert("Usuario o contraseña incorrecta");
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

        <button type="submit" className="login-boton">
          Entrar
        </button>

        <button
          type="button"
          onClick={onIrARegistro}
          className="login-crear-cuenta"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}

export default Login;