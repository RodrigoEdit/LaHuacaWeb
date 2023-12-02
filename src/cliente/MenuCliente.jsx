import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Modal, Button, FormGroup } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

export const MenuCliente = () => {
  const [listaClientes, setlistaClientes] = useState([]);
  const [clienteSeleccionado, setclienteSeleccionado] = useState(0);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [clienteEditar, setClienteEditar] = useState(null);
  const [datosCliente, setDatosCliente] = useState({
    idcli: 0,
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    dni: "",
    usuario: "",
    contra: "",
    telefono: "",
    direccion: "",
    codrol: 1,
  });

  useEffect(() => {
    traerCliente();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosCliente((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !datosCliente.nombre ||
      !datosCliente.apellido_paterno ||
      !datosCliente.apellido_materno ||
      !datosCliente.dni ||
      !datosCliente.usuario ||
      !datosCliente.contra ||
      !datosCliente.telefono ||
      !datosCliente.direccion
    ) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("https://lahuacaapiofi.onrender.com/cliente/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosCliente),
      });

      if (response.ok) {
        toast.success("Los datos del Cliente se guardaron correctamente.");
        traerCliente();
        setDatosCliente({
          idcli: 0,
          nombre: "",
          apellido_paterno: "",
          apellido_materno: "",
          dni: "",
          usuario: "",
          contra: "",
          telefono: "",
          direccion: "",
          codrol: 1,
        });
      } else {
        toast.success("Error al guardar los datos del Cliente.");
      }
    } catch (error) {
      toast.success(
        "Error al guardar los datos del Cliente. SERVIDOR REINICIAR"
      );
    }
  };

  const traerCliente = async () => {
    try {
      const response = await fetch("https://lahuacaapiofi.onrender.com/cliente/list");
      const data = await response.json();
      setlistaClientes(data);
    } catch (error) {
      console.error("Error al obtener la lista de Clientes:", error);
    }
  };

  const handleGuardarClick = async () => {
    let item = {
      nombre: clienteEditar.nombre,
      apellido_paterno: clienteEditar.apellido_paterno,
      apellido_materno: clienteEditar.apellido_materno,
      dni: clienteEditar.dni,
      usuario: clienteEditar.usuario,
      contra: clienteEditar.contra,
      telefono: clienteEditar.telefono,
      direccion: clienteEditar.direccion,
      codrol: (clienteEditar.codrol = 1),
    };
    console.warn("item", item);
    try {
      const url = `https://lahuacaapiofi.onrender.com/cliente/update/${clienteSeleccionado}`;
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
        traerCliente();
        setClienteEditar(null);
        // Aquí podrías mostrar un mensaje de éxito o realizar alguna acción adicional si es necesario.
      } else {
        toast.error("Error al guardar los datos del cliente.");
        // Aquí podrías mostrar un mensaje de error o realizar alguna acción adicional si es necesario.
      }
    } catch (error) {
      toast.error("Error al guardar los datos del cliente. SERVIDOR REINICIAR");
    }
  };

  const eliminarcliente = async () => {
    try {
      // Realizar la eliminación del piloto
      console.log("cliente seleccionado:", clienteSeleccionado);
      if (clienteSeleccionado) {
        const response = await fetch(
          `https://lahuacaapiofi.onrender.com/cliente/delete/${clienteSeleccionado}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Eliminar el piloto de la lista
          const nuevaLista = listaClientes.filter(
            (Cliente) => Cliente.idcli !== clienteSeleccionado
          );
          setlistaClientes(nuevaLista);
          toast.success("Cliente eliminado correctamente.");
        } else {
          toast.error("Error al eliminar el Cliente.");
        }
      }
    } catch (error) {
      console.error("Error al eliminar el Cliente:", error);
      toast.error("Error al eliminar el Cliente. SERVIDOR REINICIAR");
    }

    // Cerrar el modal de confirmación
    setConfirmarEliminar(false);
    setclienteSeleccionado(null);
  };

  const cantidad = listaClientes.length;
  return (
    <div className="div-home">
      <div>
        <h2 className="tittle-general">LISTADO DE CLIENTES</h2>
        <div className="CentrarBtn">
          <button
            type="button"
            className="btn-Crear"
            onClick={() => setMostrarModalRegistro(true)}
          >
            Crear cliente
          </button>
        </div>

        <div className="contador">CLIENTES ACTUALES: {cantidad}</div>
        <br />
        <div className="container">
          <div className="row">
            {listaClientes.map((Cliente) => (
              <div key={Cliente.idcli} className="col-md-4 col-md-4 ">
                <div className="card mb-4">
                  <div className="card-body" id="div-general-listar">
                    {/* <h3 className="card-title">{Cliente.nombre}</h3> */}
                    <p className="card-text">Id Cliente: {Cliente.idcli}</p>
                    <p className="card-text">Nombre: {Cliente.nombre}</p>
                    <p className="card-text">
                      Apellido Paterno: {Cliente.apellido_paterno}
                    </p>
                    <p className="card-text">
                      Apellido Materno: {Cliente.apellido_materno}
                    </p>
                    <p className="card-text">Dni: {Cliente.dni}</p>
                    <p className="card-text">Correo: {Cliente.usuario}</p>
                    <p className="card-text">Contraseña: {Cliente.contra}</p>
                    <p className="card-text">Telefono: {Cliente.telefono}</p>
                    <p className="card-text">Direccion: {Cliente.direccion}</p>
                    <div
                      className="btn-group d-flex justify-content-center"
                      role="group"
                    >
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setclienteSeleccionado(Cliente.idcli);
                          setClienteEditar(Cliente); // Configurar el estado con los datos del cliente seleccionado
                          // Aquí puedes abrir el modal de edición si lo deseas
                        }}
                      >
                        <i class="fa-sharp fa-solid fa-pen-to-square" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger ms-2"
                        onClick={() => {
                          setclienteSeleccionado(Cliente.idcli);
                          setConfirmarEliminar(true);
                        }}
                      >
                        <i class="fa-solid fa-trash" />
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
            <p>¿Estás seguro de que deseas eliminar este cliente?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                eliminarcliente();
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
          show={clienteEditar !== null}
          onHide={() => setClienteEditar(null)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {clienteEditar && (
              <FormGroup>
                <p>Id Cliente: {clienteEditar.idcli}</p>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    value={clienteEditar.nombre}
                    onChange={(e) =>
                      setClienteEditar({
                        ...clienteEditar,
                        nombre: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apellido_paterno">Apellido Paterno</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido_paterno"
                    value={clienteEditar.apellido_paterno}
                    onChange={(e) =>
                      setClienteEditar({
                        ...clienteEditar,
                        apellido_paterno: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apellido_materno">Apellido Materno</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido_materno"
                    value={clienteEditar.apellido_materno}
                    onChange={(e) =>
                      setClienteEditar({
                        ...clienteEditar,
                        apellido_materno: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dni">Dni</label>
                  <input
                    type="text"
                    className="form-control"
                    id="dni"
                    value={clienteEditar.dni}
                    onChange={(e) =>
                      setClienteEditar({
                        ...clienteEditar,
                        dni: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Telefono</label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    value={clienteEditar.telefono}
                    onChange={(e) =>
                      setClienteEditar({
                        ...clienteEditar,
                        telefono: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="direccion">Direccion</label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    value={clienteEditar.direccion}
                    onChange={(e) =>
                      setClienteEditar({
                        ...clienteEditar,
                        direccion: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="">
                  <label htmlFor="usuario" className="form-label">
                    Usuario
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="usuario"
                    name="usuario"
                    value={clienteEditar.usuario}
                    required
                    onChange={(e) =>
                      setClienteEditar({
                        ...clienteEditar,
                        usuario: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="">
                  <label htmlFor="contra" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contra"
                    name="contra"
                    value={clienteEditar.contra}
                    onChange={(e) =>
                      setClienteEditar({
                        ...clienteEditar,
                        contra: e.target.value,
                      })
                    }
                    required
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
                setClienteEditar(null); // Cerrar el modal después de editar
              }}
            >
              Guardar cambios
            </Button>
            <Button variant="secondary" onClick={() => setClienteEditar(null)}>
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
            <Modal.Title>Crear Nuevo Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body className="">
            <form onSubmit={handleSubmit}>
              <div className="">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={datosCliente.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="">
                <label htmlFor="apellido_paterno" className="form-label">
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido_paterno"
                  name="apellido_paterno"
                  value={datosCliente.apellido_paterno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="">
                <label htmlFor="apellido_materno" className="form-label">
                  Apellido Materno
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido_materno"
                  name="apellido_materno"
                  value={datosCliente.apellido_materno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="">
                <label htmlFor="dni" className="form-label">
                  Dni
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dni"
                  name="dni"
                  value={datosCliente.dni}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="">
                <label htmlFor="usuario" className="form-label">
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="usuario"
                  name="usuario"
                  value={datosCliente.usuario}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="">
                <label htmlFor="contra" className="form-label">
                  Contraseña
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contra"
                  name="contra"
                  value={datosCliente.contra}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="">
                <label htmlFor="telefono" className="form-label">
                  Telefono
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  value={datosCliente.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">
                  Direccion
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  name="direccion"
                  value={datosCliente.direccion}
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
    </div>
  );
};
