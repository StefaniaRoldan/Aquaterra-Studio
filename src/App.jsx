import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useParams,
  Link,
} from "react-router-dom";

import Calendar from "./Calendar";
import Login from "./Login";
import Registro from "./Registro";
import ReservasConfirmadas from "./ReservasConfirmadas";
import { ReservaProvider } from "./ReservaContext";
import "./App.css";
import "./index.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

// Importamos PanelAdmin (agregá este archivo si no lo tenés)
import PanelAdmin from "./PanelAdmin";

// Componente para rutas privadas
function PrivateRoute({ usuario }) {
  return usuario ? <Outlet /> : <Navigate to="/login" />;
}

// Ruta dinámica: detalle de clase
function ClaseDetalle() {
  const { id } = useParams();
  return (
    <div>
      <h2>Detalle de la clase ID: {id}</h2>
      {/* Acá podés cargar datos reales usando el ID */}
    </div>
  );
}

function App() {
  const [usuario, setUsuario] = useState(null);
  const [modoAdmin, setModoAdmin] = useState(false);

  const cerrarSesion = () => {
    if (confirm("¿Cerrar sesión?")) {
      setUsuario(null);
      setModoAdmin(false);
    }
  };

  const handleLoginRegistro = (usuarioInfo) => {
    setUsuario(usuarioInfo);
    setModoAdmin(false); // Por seguridad, modo admin off al login
  };

  return (
    <BrowserRouter>
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

            {!usuario ? (
              <div className="auth-buttons">
                <Link to="/login">
                  <button className="auth-btn">Iniciar sesión</button>
                </Link>
                <Link to="/registro">
                  <button className="auth-btn">Crear cuenta</button>
                </Link>
              </div>
            ) : (
              <div className="usuario-opciones">
                <Link to="/">
                  <button className="auth-btn">Inicio</button>
                </Link>
                <Link to="/mis-clases">
                  <button className="auth-btn">Ver mis clases</button>
                </Link>

                {/* Mostrar solo si es admin */}
                {usuario.rol === "admin" && (
                  <button
                    className="auth-btn"
                    onClick={() => setModoAdmin((prev) => !prev)}
                  >
                    {modoAdmin ? "Volver a usuario" : "Modo Administrador"}
                  </button>
                )}

                <button className="cerrar-btn" onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </nav>

          <main className="contenido">
            {usuario && modoAdmin ? (
              // Mostrar panel admin si modo admin está activo
              <PanelAdmin />
            ) : (
              <Routes>
                {/* Rutas públicas */}
                <Route
                  path="/login"
                  element={
                    usuario ? <Navigate to="/" /> : <Login setUsuario={handleLoginRegistro} />
                  }
                />
                <Route
                  path="/registro"
                  element={
                    usuario ? <Navigate to="/" /> : <Registro setUsuario={handleLoginRegistro} />
                  }
                />

                {/* Rutas privadas */}
                <Route element={<PrivateRoute usuario={usuario} />}>
                  <Route
                    path="/"
                    element={
                      <>
                        {/* Saludo con nombre o email */}
                        <h1 className="saludo">
                          ¡Hola {usuario?.nombre || usuario?.email}! 🌿
                        </h1>
                         {/* Texto informativo solo para usuarios logueados */}
      <div className="info-mensual" style={{ marginBottom: "1rem", fontStyle: "italic", color: "#5f7161" }}>
      <h2> Tenes 8 clases disponibles por mes </h2>
        Métodos de pago: Transferencia, MercadoPago, Efectivo.
       <p> Si abonas por Mercado Pago o Transferencia envianos
        el comprobante por WhatsApp </p>
      </div>
                        <Calendar />
                      </>
                    }
                  />
                  <Route
                    path="/mis-clases"
                    element={
                      <>
                        {/* Saludo personalizado */}
                        <h2 className="saludo">
                          Tus clases reservadas, {usuario?.nombre || usuario?.email}
                        </h2>
                        <ReservasConfirmadas />
                      </>
                    }
                  />
                  <Route path="/clase/:id" element={<ClaseDetalle />} />
                </Route>

                {/* Ruta catch-all */}
                <Route
                  path="*"
                  element={<Navigate to={usuario ? "/" : "/login"} />}
                />
              </Routes>
            )}
          </main>

          <footer className="footer">
            <div>Aquaterra Studio · Pilates & Yoga</div>
            <div className="footer-links">
              <a
                href="https://www.instagram.com/aqua.terraestudio/"
                target="_blank"
                rel="noopener noreferrer"
              >
                 <FaInstagram size={20} style={{ marginRight: 6 }} />
                Instagram
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=5491126418570&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                
              >
                 <FaWhatsapp size={20} style={{ marginRight: 6 }} />
                WhatsApp
              </a>
            </div>
            <div className="copyright">© 2025 Aquaterra Studio</div>
          </footer>
        </div>
      </ReservaProvider>
    </BrowserRouter>
  );
}

export default App;
