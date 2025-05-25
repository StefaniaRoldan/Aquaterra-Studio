import { useState } from "react";
import Calendar from "./Calendar";
import Login from "./Login";
import Registro from "./Registro";
import { ReservaProvider } from "./ReservaContext";
import "./App.css";
import "./index.css";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para controlar el modal
  const [tipoModal, setTipoModal] = useState(""); // Controla si es login o registro

  const cerrarSesion = () => {
    if (confirm("¿Cerrar sesión?")) {
      setUsuario(null);
    }
  };

  // Función para abrir el modal con el tipo de formulario correspondiente
  const abrirModal = (tipo) => {
    setTipoModal(tipo);
    setMostrarModal(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setMostrarModal(false);
    setTipoModal(""); // Limpiar el tipo de modal cuando se cierre
  };

  return (
    <ReservaProvider>
      <div className="app-container">
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="navbar-left">
            <div className="logo-circle">
              <img src="/logo.jpg" alt="Aquaterra Logo" />
            </div>
            <div>
              <h1 className="titulo">Aquaterra Studio</h1>
              <div className="subtitulo">Pilates & Yoga</div>
            </div>
          </div>

          {/* Solo mostrar botones si no hay usuario */}
          {!usuario && (
            <div className="auth-buttons">
              <button
                onClick={() => abrirModal("login")} // Abre el modal para login
                className="auth-btn"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => abrirModal("registro")} // Abre el modal para registro
                className="auth-btn"
              >
                Crear cuenta
              </button>
            </div>
          )}

          {/* Mostrar "Cerrar sesión" solo si hay un usuario */}
          {usuario && (
            <button className="cerrar-btn" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          )}
        </nav>

        <main className="contenido">
          {usuario && (
            <>
              <h2 className="saludo">¡Hola {usuario.nombre}! 🌿</h2>
              <Calendar />
            </>
          )}
        </main>

        {/* Mostrar el modal si está activo */}
        {mostrarModal && (
          <div className="modal-overlay" onClick={cerrarModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={cerrarModal}>
                X
              </button>
              {tipoModal === "login" ? <Login /> : <Registro />}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="footer">
          <div>Aquaterra Studio · Pilates & Yoga</div>
          <div className="footer-links">
            <a
              href="https://www.instagram.com/aqua.terraestudio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=5491126418570&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
          <div className="copyright">© 2025 Aquaterra Studio</div>
        </footer>
      </div>
    </ReservaProvider>
  );
}

export default App;