import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css"; 
//npm install react-toastify
//npm install axios
export const Login = ({ onLogin }) => {
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleUsuarioChange = (e) => {
    setUsuario(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://lahuacaapiofi.onrender.com/Login/validarTrabajador/${correo}/${usuario}`
      );

      if (response.data === 2) {
        toast.success("Datos correctos Bienvenido");
        onLogin();
      } else {
        toast.error("El correo o el usuario esta mal intenta nuevamente...");
      }
    } catch (error) {
      console.error(error);
      setMensaje(`DENEGADO3: ${error.message}`);
      toast.error("no se rellenaron datos");
    }
  };

  return (
    <body>
      <div id="form_login">
        <form className="form-login" onSubmit={handleSubmit}>
          <h3>Login</h3>
          <label className="label-login" htmlFor="correo">
          <i id="icon-login" class="fa-duotone fa-paper-plane"></i> Correo: 
          </label>
          <input
            type="text"
            id="AnchoInput"
            value={correo}
            onChange={handleCorreoChange}
            className="input-login"
            required
          />

          <label className="label-login" htmlFor="usuario">
          <i id="icon-login" class="fa-duotone fa-key"></i> Contraseña: 
          </label>
          <input
            type="password"
            id="usuario"
            value={usuario}
            onChange={handleUsuarioChange}
            className="input-login"
            required
          />

          <button
            style={{ fontWeight: "bold" }}
            type="submit"
            className="btn-login"
            onClick={handleSubmit}
          >
            Ingresar <i class="fa-sharp fa-light fa-arrow-right-to-bracket"></i>
          </button>
        </form>
      </div>
      {mensaje && <p>{mensaje}</p>}
    </body>
  );
};
