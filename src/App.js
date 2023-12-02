import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { MenuCliente } from "./cliente/MenuCliente";
import { MenuTrabajador } from "./trabajador/MenuTrabajador";
import { MenuCategoria } from "./categoria/MenuCategoria";
import { MenuUsuario } from "./Usuario/MenuUsuario";
import { MenuHabitaciones } from "./habitaciones_disponibles/MenuHabitaciones";
import { MenuReserva } from "./reservas/MenuReservas";
import { MenuRol } from "./rol/MenuRol";

import "./index.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn"); // Elimina el estado de inicio de sesión de localStorage
    navigate("/"); // Redirigir al usuario al login después de cerrar sesión
  };

  // Efecto para comprobar el inicio de sesión en cada carga de página
  useEffect(() => {
    // Verifica si hay un estado de inicio de sesión almacenado en localStorage
    const loggedInStatus = localStorage.getItem("loggedIn");
    if (loggedInStatus === "true") {
      setLoggedIn(true);
    }
  }, []);

  // Efecto para guardar el estado de inicio de sesión en localStorage
  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);





    /*<a class="nav-link" href="#">
                    <Link to="/usuario">
                      <button className="btn-nav">
                        <i class="fa-solid fa-user-secret"></i> Usuario
                      </button>
                    </Link>
                  </a>*/








  return (
    <div>
      {loggedIn ? (
        <>
          <nav class="navbar navbar-expand-lg" id="navar">
            <div class="container-fluid">
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <a class="navbar-brand">
                <Link to="/">
                  <button className="btn-nav">Inicio</button>
                </Link>
              </a>
              <div
                class="collapse navbar-collapse d-lg-flex justify-content-end"
                id="navbarSupportedContent"
              >
                <div class="navbar-nav text-center">
                  <a class="nav-link" href="#">
                    <Link to="/habitaciones">
                      <button className="btn-nav">
                        <i class="fa-solid fa-gauge-high"></i> Dashboard
                      </button>
                    </Link>
                  </a>
                  <a class="nav-link" href="#">
                    <Link to="/reservas">
                      <button className="btn-nav">
                        <i class="fa-solid fa-bell-concierge"></i> Reservas
                      </button>
                    </Link>
                  </a>
                  <a class="nav-link" href="#">
                    <Link to="/categoria">
                      <button className="btn-nav">
                        <i class="fa-solid fa-clipboard"></i> Categoria
                      </button>
                    </Link>
                  </a>
                  <a class="nav-link" href="#">
                    <Link to="/rol">
                      <button className="btn-nav">
                        <i class="fa-solid fa-clipboard"></i> Roles
                      </button>
                    </Link>
                  </a>
                  <a class="nav-link" href="#">
                    <Link to="/cliente">
                      <button className="btn-nav">
                        <i class="fa-solid fa-user"></i> Cliente
                      </button>
                    </Link>
                  </a>
                  
                  <a class="nav-link" href="#">
                    <Link to="/trabajador">
                      <button className="btn-nav">
                        <i class="fa-solid fa-user-tie"></i> Trabajador
                      </button>
                    </Link>
                  </a>
                  <a class="nav-link">
                    <button className="btn-cerrarsesion" onClick={handleLogout}>
                      <i class="fa-solid fa-right-from-bracket"></i>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </>
      ) : null}
      <Routes>
        {/* Si el usuario está logueado, mostrar el componente de Inicio */}
        {loggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/cliente" element={<MenuCliente />} />
            <Route path="/trabajador" element={<MenuTrabajador />} />
            <Route path="/categoria" element={<MenuCategoria />} />
            <Route path="/usuario" element={<MenuUsuario />} />
            <Route path="/habitaciones" element={<MenuHabitaciones />} />
            <Route path="/reservas" element={<MenuReserva />} />
            <Route path="/rol" element={<MenuRol />} />
          </>
        ) : (
          // Si el usuario no está logueado, mostrar el componente de Login
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        )}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
