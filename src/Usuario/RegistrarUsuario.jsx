import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegistrarUsuario = () => {
  const [datosUsuario, setDatosUsuario] = useState({
    idUsuario: 0,
    idRo: '', // El valor de idRo será '1' o '2' según la selección del combobox.
    nombreUsuario: '',
    correo: '',
    clave: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosUsuario((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !datosUsuario.nombreUsuario ||
      !datosUsuario.correo ||
      !datosUsuario.clave ||
      !datosUsuario.idRo
    ) {
      toast.error('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('https://localhost:7210/api/Usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosUsuario),
      });

      if (response.ok) {
        toast.success('Los datos del Usuario se guardaron correctamente.');
        // Aquí puedes agregar la lógica adicional después de guardar los datos.
      } else {
        toast.success('Error al guardar los datos del Usuario.');
      }
    } catch (error) {
      toast.success('Error al guardar los datos del Usuario. SERVIDOR REINICIAR');
    }
  };

  return (
    <div className="bg-light" style={{ marginTop: 20, padding: 20 }}>
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <div className="mb-3">
          <label htmlFor="nombreUsuario" className="form-label">
            nombreUsuario
          </label>
          <input
            type="text"
            className="form-control"
            id="nombreUsuario"
            name="nombreUsuario"
            value={datosUsuario.nombreUsuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            correo
          </label>
          <input
            type="text"
            className="form-control"
            id="correo"
            name="correo"
            value={datosUsuario.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="clave" className="form-label">
            clave
          </label>
          <input
            type="text"
            className="form-control"
            id="clave"
            name="clave"
            value={datosUsuario.clave}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="idRo" className="form-label">
            idRo
          </label>
          <select
            id="idRo"
            name="idRo"
            value={datosUsuario.idRo}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Selecciona un rol</option>
            <option value="1">Recepcionista</option>
            <option value="2">Administrador</option>
          </select>
        </div>

        {/* Agrega más campos del formulario según tus necesidades */}
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
};
