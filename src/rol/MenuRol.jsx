import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Modal, Button, FormGroup } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

export const MenuRol = () => {
  const [listaCategoria, setlistaCategoria] = useState([]);
  const [categoriaSeleccionado, setcategoriaSeleccionado] = useState(0);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [categoriaEditar, setCategoriaEditar] = useState(null);
  const [datosRol, setdatosRol] = useState({
    idRol: 0,
    nombre: "",
  });
  useEffect(() => {
    traerCategoria();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdatosRol((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!datosRol.nombre) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("https://lahuacaapiofi.onrender.com/rol/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosRol),
      });

      if (response.ok) {
        toast.success("Los datos de la categoria se guardaron correctamente.");
        traerCategoria();
        setdatosRol({
            idRol: 0,
            nombre: "",
        });
        // Aquí puedes agregar la lógica adicional después de guardar los datos.
      } else {
        toast.success("Error al guardar los datos de la categoria.");
      }
    } catch (error) {
      toast.success(
        "Error al guardar los datos de la categoria. SERVIDOR REINICIAR"
      );
    }
  };

  const traerCategoria = async () => {
    try {
      const response = await fetch("https://lahuacaapiofi.onrender.com/rol/list");
      const data = await response.json();
      setlistaCategoria(data);
    } catch (error) {
      console.error("Error al obtener la lista de Clientes:", error);
    }
  };

  const handleGuardarClick = async () => {
    let item = {
        idRol: categoriaEditar.idRol,
        nombre: categoriaEditar.nombre,

    };
    console.warn("item", item);
    try {
      const url = `https://lahuacaapiofi.onrender.com/rol/update/${categoriaSeleccionado}`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      };

      const response = await fetch(url, options);
      if (response.ok) {
        toast.success("Los datos del Cliente se actualizaron correctamente.");
        traerCategoria();
        setCategoriaEditar(null);
        // Aquí podrías mostrar un mensaje de éxito o realizar alguna acción adicional si es necesario.
      } else {
        toast.error("Error al guardar los datos del cliente.");
        // Aquí podrías mostrar un mensaje de error o realizar alguna acción adicional si es necesario.
      }
    } catch (error) {
      toast.error("Error al guardar los datos del cliente. SERVIDOR REINICIAR");
    }
  };

  const eliminarcategoria = async () => {
    try {
      // Realizar la eliminación del piloto
      console.log("categoria seleccionado:", categoriaSeleccionado);
      if (categoriaSeleccionado) {
        const response = await fetch(
          `https://lahuacaapiofi.onrender.com/rol/delete/${categoriaSeleccionado}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Eliminar el piloto de la lista
          const nuevaLista = listaCategoria.filter(
            (item) => item.idRol !== categoriaSeleccionado
          );
          setlistaCategoria(nuevaLista);
          toast.success("Categoria eliminado correctamente.");
        } else {
          throw new Error("Error al eliminar el Categoria.");
        }
      }
    } catch (error) {
      console.error("Error al eliminar el Categoria:", error);
      toast.error("Error al eliminar el Categoria. Tiene alguna Reserva");
    }

    // Cerrar el modal de confirmación
    setConfirmarEliminar(false);
    setcategoriaSeleccionado(null);
  };
  const cantidad = listaCategoria.length;
  return (
    <div className="div-home">
      <h2 className="tittle-general">LISTADO DE ROL</h2>
      <div className="CentrarBtn">
        <button
          type="button"
          className="btn-Crear"
          onClick={() => setMostrarModalRegistro(true)}
        >
          Crear Categoria
        </button>
      </div>
      <div className="contador">CANTIDAD DE ROL: {cantidad}</div>
      <br />
      <div className="container">
        <table className="table">
          <thead className="bg-primary text-color-white">
            <tr>
              <th scope="col">id</th>
              <th scope="col">nombre</th>
              <th scope="col">opciones</th>
            </tr>
          </thead>
          <tbody className="bg-warning">
            {listaCategoria.map((item, indice) => {
              return (
                <tr key={item.idRol}>
                  <td class="table-primary">{item.idRol}</td>
                  <td class="table-success">{item.nombre}</td>
                  <td style={{ backgroundColor: "white", border: "none" }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setcategoriaSeleccionado(item.idRol);
                        setCategoriaEditar(item); // Configurar el estado con los datos del cliente seleccionado
                        // Aquí puedes abrir el modal de edición si lo deseas
                      }}
                    >
                      <i class="fa-sharp fa-solid fa-pen-to-square"/>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={() => {
                        setcategoriaSeleccionado(item.idRol);
                        setConfirmarEliminar(true);
                      }}
                    >
                      <i class="fa-solid fa-trash"/>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />


      <Modal
        show={confirmarEliminar}
        onHide={() => setConfirmarEliminar(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar este rol?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              eliminarcategoria();
              setConfirmarEliminar(false); // Cerrar el modal después de eliminar
            }}
          >
            Eliminar
          </Button>
          <Button
            variant="secondary"
            onClick={() => setConfirmarEliminar(false)}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={categoriaEditar !== null}
        onHide={() => setCategoriaEditar(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {categoriaEditar && (
            <FormGroup>
              <p>Id Categoria: {categoriaEditar.idRol}</p>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={categoriaEditar.nombre}
                  onChange={(e) =>
                    setCategoriaEditar({
                      ...categoriaEditar,
                      nombre: e.target.value,
                    })
                  }
                />
              </div>
              
            </FormGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleGuardarClick();
              setCategoriaEditar(null); // Cerrar el modal después de editar
            }}
          >
            Guardar cambios
          </Button>
          <Button variant="secondary" onClick={() => setCategoriaEditar(null)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={mostrarModalRegistro}
        onHide={() => setMostrarModalRegistro(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={datosRol.nombre}
                onChange={handleChange}
                required
              />
            </div>
            
            <div class="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
