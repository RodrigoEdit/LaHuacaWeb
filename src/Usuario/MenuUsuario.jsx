import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Modal, Button, FormGroup } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
export const MenuUsuario = () => {
  const [listaUsuario, setlistaUsuario] = useState([]);
  const [UsuarioSeleccionado, setusuarioSeleccionado] = useState(0);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState({
    idUsuario: 0,
    idRo: "", // El valor de idRo será '1' o '2' según la selección del combobox.
    nombreUsuario: "",
    correo: "",
    clave: "",
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
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("https://lahuacaapiofi.onrender.com/api/Usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosUsuario),
      });

      if (response.ok) {
        console.log(datosUsuario);
        toast.success("Los datos del Usuario se guardaron correctamente.");
        traerUsuario();
        setDatosUsuario({
          idUsuario: 0,
          idRo: "", // El valor de idRo será '1' o '2' según la selección del combobox.
          nombreUsuario: "",
          correo: "",
          clave: "",
        });
        // Aquí puedes agregar la lógica adicional después de guardar los datos.
      } else {
        toast.success("Error al guardar los datos del Usuario.");
      }
    } catch (error) {
      toast.success(
        "Error al guardar los datos del Usuario. SERVIDOR REINICIAR"
      );
    }
  };

  useEffect(() => {
    traerUsuario();
  }, []);

  const traerUsuario = async () => {
    try {
      const response = await fetch("https://lahuacaapiofi.onrender.com/api/Usuario");
      const data = await response.json();
      setlistaUsuario(data);
    } catch (error) {
      console.error("Error al obtener la lista de Usuarios:", error);
    }
  };

  const handleGuardarClick = async () => {
    let item = {
      idUsuario: usuarioEditar.idUsuario,
      idRo: usuarioEditar.idRo,
      nombreUsuario: usuarioEditar.nombreUsuario,
      correo: usuarioEditar.correo,
      clave: usuarioEditar.clave,
    };
    console.warn("item", item);
    try {
      const url = `https://lahuacaapiofi.onrender.com/api/Usuario/${UsuarioSeleccionado}`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      };

      const response = await fetch(url, options);
      if (response.ok) {
        toast.success("Los datos del Usuario se actualizaron correctamente.");
        traerUsuario();
        // Aquí podrías mostrar un mensaje de éxito o realizar alguna acción adicional si es necesario.
      } else {
        toast.error("Error al guardar los datos del Usuario.");
        // Aquí podrías mostrar un mensaje de error o realizar alguna acción adicional si es necesario.
      }
    } catch (error) {
      toast.error("Error al guardar los datos del Usuario. SERVIDOR REINICIAR");
    }
  };

  const eliminarUsuario = async () => {
    try {
      // Realizar la eliminación del piloto
      console.log("Usuario seleccionado:", UsuarioSeleccionado);
      if (UsuarioSeleccionado) {
        const response = await fetch(
          `https://lahuacaapiofi.onrender.com/api/Usuario/${UsuarioSeleccionado}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Eliminar el piloto de la lista
          const nuevaLista = listaUsuario.filter(
            (Usuario) => Usuario.idUsuario !== UsuarioSeleccionado
          );
          setlistaUsuario(nuevaLista);
          toast.success("Usuario eliminado correctamente.");
        } else {
          toast.error("Error al eliminar el Usuario.");
        }
      }
    } catch (error) {
      console.error("Error al eliminar el Usuario:", error);
      toast.error("Error al eliminar el Usuario. SERVIDOR REINICIAR");
    }

    // Cerrar el modal de confirmación
    setConfirmarEliminar(false);
    setusuarioSeleccionado(null);
  };
  const cantidad = listaUsuario.length;
  return (
    <div className="div-home">
      <div>
        <h2 className="tittle-general">LISTADO DE USUARIOS</h2>
        <div className="CentrarBtn">
          <button
            type="button"
            className="btn-Crear"
            onClick={() => setMostrarModalRegistro(true)}
          >
            Crear Trabajador
          </button>
        </div>

        <div className="contador">USUARIOS ACTUALES: {cantidad}</div>
        <br />
        <div className="container">
          <div className="row">
            {listaUsuario.map((Usuario) => (
              <div key={Usuario.idUsuario} className="col-md-4">
                <div className="card mb-4" >
                  <div className="card-body"id="div-general-listar">
                    {/* <h3 className="card-title">{Cliente.nombre}</h3> */}

                    <p className="card-text">Correo: {Usuario.correo}</p>
                    <p className="card-text">Nombre: {Usuario.nombreUsuario}</p>

                    <div className="btn-group d-flex justify-content-center" role="group">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          console.log("Clic en Editar");
                          setusuarioSeleccionado(Usuario.idUsuario);
                          setUsuarioEditar(Usuario); // Configurar el estado con los datos del cliente seleccionado
                          // Aquí puedes abrir el modal de edición si lo deseas
                        }}
                      >
                        <i class="fa-sharp fa-solid fa-pen-to-square"/>
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger ms-2"
                        onClick={() => {
                          console.log("Clic en Eliminar");
                          setusuarioSeleccionado(Usuario.idUsuario);

                          setConfirmarEliminar(true);
                        }}
                      >
                        <i class="fa-solid fa-trash"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <p>¿Estás seguro de que deseas eliminar este Usuario?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                eliminarUsuario();
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
          show={usuarioEditar !== null}
          onHide={() => setUsuarioEditar(null)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {usuarioEditar && (
              <FormGroup>
                <p>Id Usuario: {usuarioEditar.idUsuario}</p>
                <div className="form-group">
                  <label htmlFor="idRo">Rol</label>
                  <select
                    className="form-control"
                    id="idRo"
                    value={usuarioEditar.idRo}
                    onChange={(e) =>
                      setUsuarioEditar({
                        ...usuarioEditar,
                        idRo: e.target.value,
                      })
                    }
                  >
                    <option value="1">Recepcionista</option>
                    <option value="2">Administrador</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="nombreUsuario">NombreUsuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombreUsuario"
                    value={usuarioEditar.nombreUsuario}
                    onChange={(e) =>
                      setUsuarioEditar({
                        ...usuarioEditar,
                        nombreUsuario: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="correo">correo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="correo"
                    value={usuarioEditar.correo}
                    onChange={(e) =>
                      setUsuarioEditar({
                        ...usuarioEditar,
                        correo: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="clave">clave</label>
                  <input
                    type="text"
                    className="form-control"
                    id="clave"
                    value={usuarioEditar.clave}
                    onChange={(e) =>
                      setUsuarioEditar({
                        ...usuarioEditar,
                        clave: e.target.value,
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
                setUsuarioEditar(null); // Cerrar el modal después de editar
              }}
            >
              Guardar cambios
            </Button>
            <Button variant="secondary" onClick={() => setUsuarioEditar(null)}>
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
            <Modal.Title>Crear Nuevo Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-info text-white">
            <form onSubmit={handleSubmit}>
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
                  Rol
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
              <div class="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
