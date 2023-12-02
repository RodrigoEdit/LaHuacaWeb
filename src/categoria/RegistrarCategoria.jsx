import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegistrarCategoria = () => {
  const [datosCategoria, setdatosCategoria] = useState({
        idc: 0,
        categoria1: '',
        descripcion: '',
        habitacionesDisponibles: []
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdatosCategoria((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (  !datosCategoria.categoria1 || !datosCategoria.descripcion ) {
            toast.error('Por favor, completa todos los campos.');
            return;
          }
    
        try {
          const response = await fetch('https://localhost:7210/api/Categoria', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosCategoria),
          });
      
          if (response.ok) {
            toast.success('Los datos de la categoria se guardaron correctamente.');
            
            document.getElementById("categoria1").value = "";
            document.getElementById("descripcion").value = "";
            document.getElementById("categoria1").focus();
            // Aquí puedes agregar la lógica adicional después de guardar los datos.
          } else {
            toast.success('Error al guardar los datos de la categoria.');
          }
        } catch (error) {
            toast.success('Error al guardar los datos de la categoria. SERVIDOR REINICIAR');
        }
      };


  return (
    <div className="bg-light" style={{marginTop:20, padding:20}}>
    <h2>Crear Nueva Categoria</h2>
    <form onSubmit={handleSubmit} style={{marginTop:20}} >
      <div className="mb-3">
        <label htmlFor="categoria1" className="form-label">Categoria</label>
        <input type="text" className="form-control" id="categoria1" name="categoria1"  value={datosCategoria.categoria1} onChange={handleChange}  required />
      </div>
      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">Descripcion</label>
        <input type="text" className="form-control" id="descripcion" name="descripcion"  value={datosCategoria.descripcion} onChange={handleChange} required  />
      </div>
      {/* Agrega más campos del formulario según tus necesidades */}
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  </div>

  )
}