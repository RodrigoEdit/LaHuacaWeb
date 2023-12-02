import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegistrarCliente = () => {
    const [datosCliente, setDatosCliente] = useState({
        idcli: 0,
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        dni: '',
        telefono: '',
        direccion: '',
        reservas: []
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosCliente((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ( !datosCliente.nombre || !datosCliente.apellidoPaterno || !datosCliente.apellidoMaterno || !datosCliente.dni || !datosCliente.telefono || !datosCliente.direccion) {
            toast.error('Por favor, completa todos los campos.');
            return;
          }
    
        try {
          const response = await fetch('https://localhost:7210/api/DatosdelClientes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosCliente),
          });
      
          if (response.ok) {
            toast.success('Los datos del Cliente se guardaron correctamente.');
            document.getElementById("nombre").value = "";
            document.getElementById("apellidoPaterno").value = "";
            document.getElementById("apellidoMaterno").value = "";
            document.getElementById("dni").value = "";
            document.getElementById("telefono").value = "";
            document.getElementById("direccion").value = "";
            document.getElementById("nombre").focus();
            // Aquí puedes agregar la lógica adicional después de guardar los datos.
          } else {
            toast.success('Error al guardar los datos del Cliente.');
          }
        } catch (error) {
            toast.success('Error al guardar los datos del Cliente. SERVIDOR REINICIAR');
        }
      };


  return (
    <div className="bg-light" style={{marginTop:20, padding:20}}>
    <h2>Crear Nuevo Cliente</h2>
    <form onSubmit={handleSubmit} style={{marginTop:20}}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input type="text" className="form-control" id="nombre" name="nombre" value={datosCliente.nombre} onChange={handleChange} required  />
      </div>
      <div className="mb-3">
        <label htmlFor="apellidoPaterno" className="form-label">Apellido Paterno</label>
        <input type="text" className="form-control" id="apellidoPaterno" name="apellidoPaterno" value={datosCliente.apellidoPaterno} onChange={handleChange}  required />
      </div>
      <div className="mb-3">
        <label htmlFor="apellidoMaterno" className="form-label">Apellido Materno</label>
        <input type="text" className="form-control" id="apellidoMaterno" name="apellidoMaterno" value={datosCliente.apellidoMaterno} onChange={handleChange} required  />
      </div>
      <div className="mb-3">
        <label htmlFor="dni" className="form-label">Dni</label>
        <input type="number" className="form-control" id="dni" name="dni" value={datosCliente.dni} onChange={handleChange}  required />
      </div>
      <div className="mb-3">
        <label htmlFor="telefono" className="form-label">Telefono</label>
        <input type="text" className="form-control" id="telefono" name="telefono" value={datosCliente.telefono} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="direccion" className="form-label">Direccion</label>
        <input type="text" className="form-control" id="direccion" name="direccion" value={datosCliente.direccion} onChange={handleChange}  required />
      </div>
      {/* Agrega más campos del formulario según tus necesidades */}
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  </div>

  )
}
