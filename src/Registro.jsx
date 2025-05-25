import { useState } from "react";

function Registro({ onRegister, volver }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !email || !telefono || !password) {
      alert("Por favor completá todos los campos.");
      return;
    }

    const usuario = {
      nombre,
      email,
      telefono,
    };

    onRegister(usuario);
  };

  return (
    <div className="registro-container">
      <h1 className="registro-titulo">
        Crear cuenta
      </h1>

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