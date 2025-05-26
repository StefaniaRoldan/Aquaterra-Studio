import { useState } from "react";
import Calendar from "./Calendar";
import Login from "./Login";
import Registro from "./Registro";
import { ReservaProvider } from "./ReservaContext";
import ReservasConfirmadas from "./ReservasConfirmadas";
import "./App.css";
import "./index.css";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoModal, setTipoModal] = useState("");
  const [mostrarReservas, setMostrarReservas] = useState(false);

  const cerrarSesion = () => {
    if (confirm("¿Cerrar sesión?")) {
      setUsuario(null);
      setMostrarReservas(false);
    }
  };

  const abrirModal = (tipo) => {
    setTipoModal(tipo);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setTipoModal("");
  };

  // ✅ Maneja cuando el usuario inicia sesión o se registra
  const handleLoginRegistro = (usuarioInfo) => {
    setUsuario(usuarioInfo);
    cerrarModal(); // Cierra el modal automáticamente
  };

  return (
    <ReservaProvider>
      <div className="app-container">
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

          {!usuario && (
            <div className="auth-buttons">
              <button onClick={() => abrirModal("login")} className="auth-btn">
                Iniciar sesión
              </button>
              <button onClick={() => abrirModal("registro")} className="auth-btn">
                Crear cuenta
              </button>
            </div>
          )}

          {usuario && (
            <div className="usuario-opciones">
              <button className="auth-btn" onClick={() => setMostrarReservas(!mostrarReservas)}>
                {mostrarReservas ? "Ocultar mis clases" : "Ver mis clases"}
              </button>
              <button className="cerrar-btn" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </div>
          )}
        </nav>

        <main className="contenido">
          {usuario && (
            <>
              <h2 className="saludo">¡Hola {usuario.nombre || usuario.email}! 🌿</h2>
              <Calendar />
              {mostrarReservas && <ReservasConfirmadas />}
            </>
          )}
        </main>

        {mostrarModal && (
          <div className="modal-overlay" onClick={cerrarModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={cerrarModal}>
                X
              </button>

              {tipoModal === "login" ? (
                <Login onLogin={handleLoginRegistro} />
              ) : (
                <Registro setUsuario={handleLoginRegistro} />
              )}
            </div>
          </div>
        )}

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