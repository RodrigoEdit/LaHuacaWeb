import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Modal, Button, FormGroup } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

export const MenuTrabajador = () => {
  const [listaTrabajador, setlistaTrabajador] = useState([]);
 
  const [trabajadorSeleccionado, settrabajadorSeleccionado] = useState(0);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [trabajadorEditar, setTrabajadorEditar] = useState(null);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [datosTrabajador, setDatosTrabajador] = useState({
    idt: 0,
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    dni: "",
    usuario: "",
    contra: "",
    telefono: "",
    direccion: "",
    fecha_Ingreso: "",
    salario: "",
    idrol: 0,
  });

  const [ListaRol, setListarRol] = useState([]);

  useEffect(() => {
    traerTrbajador();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosTrabajador((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !datosTrabajador.nombre ||
      !datosTrabajador.apellido_paterno ||
      !datosTrabajador.apellido_materno ||
      !datosTrabajador.dni ||
      !datosTrabajador.usuario ||
      !datosTrabajador.contra ||
      !datosTrabajador.telefono ||
      !datosTrabajador.direccion ||
      !datosTrabajador.fecha_Ingreso ||
      !datosTrabajador.salario
    ) {
      toast.error("Por favor, completa todos los campos.");

      return;
    }

    try {
      const response = await fetch("https://lahuacaapiofi.onrender.com/trabajador/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosTrabajador),
      });

      if (response.ok) {
        toast.success("Los datos del Trabajador se guardaron correctamente.");
        traerTrbajador();
        setDatosTrabajador({
          idt: 0,
          nombre: "",
          apellido_paterno: "",
          apellido_materno: "",
          dni: "",
          usuario: "",
          contra: "",
          telefono: "",
          direccion: "",
          fecha_Ingreso: "",
          salario: "",
          idrol: 0,
        });
      } else {
        toast.error("Error al guardar los datos del Trabajador.");
      }
    } catch (error) {
      toast.error(
        "Error al guardar los datos del Trabajador. SERVIDOR REINICIAR"
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const traerTrbajador = async () => {
    try {
      const response = await fetch("https://lahuacaapiofi.onrender.com/trabajador/list");
      const data = await response.json();
      setlistaTrabajador(data);


      const responseRoles = await fetch("https://lahuacaapiofi.onrender.com/rol/list");
      const dataRol = await responseRoles.json();
      setListarRol(dataRol);
    } catch (error) {
      console.error("Error al obtener la lista de Trabajadores:", error);
    }
  };

  const handleGuardarClick = async () => {
    let item = {
      idt: trabajadorEditar.idt,
      nombre: trabajadorEditar.nombre,
      apellido_paterno: trabajadorEditar.apellido_paterno,
      apellido_materno: trabajadorEditar.apellido_materno,
      dni: trabajadorEditar.dni,
      usuario: trabajadorEditar.usuario,
      contra: trabajadorEditar.contra,
      telefono: trabajadorEditar.telefono,
      direccion: trabajadorEditar.direccion,
      fecha_Ingreso: trabajadorEditar.fecha_Ingreso,
      salario: trabajadorEditar.salario,
      codrol: trabajadorEditar.codrol,
    };
    try {
      const url = `https://lahuacaapiofi.onrender.com/trabajador/update/${trabajadorSeleccionado}`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      };

      const response = await fetch(url, options);
      if (response.ok) {
        toast.success(
          "Los datos del Trabajador se actualizaron correctamente."
        );
        traerTrbajador();
      } else {
        toast.error("Error al guardar los datos del trabajador.");
      }
    } catch (error) {
      toast.error(
        "Error al guardar los datos del trabajador. SERVIDOR REINICIAR"
      );
    }
  };

  const eliminartrabajador = async () => {
    try {
      // Realizar la eliminación del piloto
      console.log("Trabajador seleccionado:", trabajadorSeleccionado);
      if (trabajadorSeleccionado) {
        const response = await fetch(
          `https://lahuacaapiofi.onrender.com/trabajador/delete/${trabajadorSeleccionado}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Eliminar el piloto de la lista
          const nuevaLista = listaTrabajador.filter(
            (Trabajador) => Trabajador.idt !== trabajadorSeleccionado
          );
          setlistaTrabajador(nuevaLista);
          toast.success("Trabajador eliminado correctamente.");
        } else {
          toast.error("Error al eliminar el Trabajador.");
        }
      }
    } catch (error) {
      console.error("Error al eliminar el Trabajador:", error);
      toast.error("Error al eliminar el Trabajador. SERVIDOR REINICIAR");
    }

    // Cerrar el modal de confirmación
    setConfirmarEliminar(false);
    settrabajadorSeleccionado(null);
  };

  const cantidad = listaTrabajador.length;

  const getNombreRol = (idRol) => {
    const RolEncontrado = ListaRol.find(
      (rol) => rol.idRol === idRol
    );
    return RolEncontrado ? RolEncontrado.nombre : "";
  };

  return (
    <div className="div-home">
      <div>
        <h2 className="tittle-general">LISTADO DE TRABAJADORES</h2>
        <div className="CentrarBtn">
          <button
            type="button"
            className="btn-Crear"
            onClick={() => setMostrarModalRegistro(true)}
          >
            Crear Trabajador
          </button>
        </div>
        <div className="contador">TRABAJADORES ACTUALES: {cantidad}</div>
        <br />
        <div className="container">
          <div className="row">
            {listaTrabajador.map((Trabajador) => (
              <div key={Trabajador.idt} className="col-md-4 col-md-4">
                <div className="card mb-4">
                  <div className="card-body" id="div-general-listar">
                    <p className="card-text">Id Trabajador: {Trabajador.idt}</p>
                    <p className="card-text">Nombre: {Trabajador.nombre}</p>
                    <p className="card-text">
                      Apellido Paterno: {Trabajador.apellido_paterno}
                    </p>
                    <p className="card-text">
                      Apellido Materno: {Trabajador.apellido_materno}
                    </p>
                    <p className="card-text">Dni: {Trabajador.dni}</p>
                    <p className="card-text">Telefono:{Trabajador.telefono}</p>
                    <p className="card-text">
                      direccion: {Trabajador.direccion}
                    </p>
                    <p className="card-text">
                      Fecha de Ingreso: {formatDate(Trabajador.fecha_Ingreso)}
                    </p>
                    <p className="card-text">Salario: {Trabajador.salario}</p>
                    <p className="card-text">Usuario: {Trabajador.usuario}</p>
                    <p className="card-text">Contraseña: {Trabajador.contra}</p>
                    <p className="card-text">
                      Rol: {getNombreRol(Trabajador.codrol)}
                    </p>

                    <div>
                      <div
                        className="btn-group d-flex justify-content-center"
                        role="group"
                      >
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            settrabajadorSeleccionado(Trabajador.idt);
                            setTrabajadorEditar(Trabajador);
                          }}
                        >
                          <i class="fa-sharp fa-solid fa-pen-to-square" />
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            settrabajadorSeleccionado(Trabajador.idt);
                            setConfirmarEliminar(true);
                          }}
                        >
                          <i class="fa-solid fa-trash" />
                        </button>
                      </div>
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
            <p>¿Estás seguro de que deseas eliminar este Trabajador?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                eliminartrabajador();
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
          show={trabajadorEditar !== null}
          onHide={() => setTrabajadorEditar(null)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar Trabajador</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {trabajadorEditar && (
              <FormGroup>
                <p>Id Trabajador: {trabajadorEditar.idt}</p>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    value={trabajadorEditar.nombre}
                    onChange={(e) =>
                      setTrabajadorEditar({
                        ...trabajadorEditar,
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
                    value={trabajadorEditar.apellido_paterno}
                    onChange={(e) =>
                      setTrabajadorEditar({
                        ...trabajadorEditar,
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
                    value={trabajadorEditar.apellido_materno}
                    onChange={(e) =>
                      setTrabajadorEditar({
                        ...trabajadorEditar,
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
                    value={trabajadorEditar.dni}
                    onChange={(e) =>
                      setTrabajadorEditar({
                        ...trabajadorEditar,
                        dni: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="usuario">Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="usuario"
                    value={trabajadorEditar.usuario}
                    onChange={(e) =>
                      setTrabajadorEditar({
                        ...trabajadorEditar,
                        usuario: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contra">Contraseña</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contra"
                    value={trabajadorEditar.contra}
                    onChange={(e) =>
                      setTrabajadorEditar({
                        ...trabajadorEditar,
                        contra: e.target.value,
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
                    value={trabajadorEditar.telefono}
                    onChange={(e) =>
                      setTrabajadorEditar({
                        ...trabajadorEditar,
                        telefono: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="direccion">Direcion</label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    value={trabajadorEditar.direccion}
                    onChange={(e) =>
                      setTrabajadorEditar({
                        ...trabajadorEditar,
                        direccion: e.target.value,
                      })
                    }
                  />
                </div>
                

                <div className="form-group">
                  <label htmlFor="salario">Salario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="salario"
                    value={trabajadorEditar.salario}
                    onChange={(e) =>
                      setTrabajadorEditar({
                        ...trabajadorEditar,
                        salario: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fecha_Ingreso">Fecha de Ingreso</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha_Ingreso"
                    value={trabajadorEditar.fecha_Ingreso}
                    onChange={(e) =>
                      setTrabajadorEditar({
                        ...trabajadorEditar,
                        fecha_Ingreso: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                <label htmlFor="codrol" className="form-label">
                  Roles:
                </label>
                <select
                  id="codrol"
                  name="codrol"
                  value={trabajadorEditar.codrol}
                  onChange={(e) =>
                    setTrabajadorEditar({
                      ...trabajadorEditar,
                      codrol: parseInt(e.target.value),
                    })
                  }
                  className="form-control"
                  required
                >
                  <option value="">Selecciona un rol</option>
                  {ListaRol.map((rol) => (
                    <option key={rol.codrol} value={rol.idRol}>
                      {rol.nombre}
                    </option>
                  ))}
                </select>
              </div>
              </FormGroup>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                handleGuardarClick();
                setTrabajadorEditar(null); // Cerrar el modal después de editar
              }}
            >
              Guardar cambios
            </Button>
            <Button
              variant="secondary"
              onClick={() => setTrabajadorEditar(null)}
            >
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
            <Modal.Title>Crear Nuevo Trabajador</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-info text-white">
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
                  value={datosTrabajador.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="apellido_paterno" className="form-label">
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido_paterno"
                  name="apellido_paterno"
                  value={datosTrabajador.apellido_paterno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="apellido_materno" className="form-label">
                  Apellido Materno
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido_materno"
                  name="apellido_materno"
                  value={datosTrabajador.apellido_materno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dni" className="form-label">
                  Dni
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dni"
                  name="dni"
                  value={datosTrabajador.dni}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">
                  Telefono
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  value={datosTrabajador.telefono}
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
                  value={datosTrabajador.direccion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="salario" className="form-label">
                  Salario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="salario"
                  name="salario"
                  value={datosTrabajador.salario}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="fecha_Ingreso" className="form-label">
                  Fecha de Ingreso
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fecha_Ingreso"
                  name="fecha_Ingreso"
                  value={datosTrabajador.fecha_Ingreso}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="usuario" className="form-label">
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="usuario"
                  name="usuario"
                  value={datosTrabajador.usuario}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contra" className="form-label">
                  Contraseña
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contra"
                  name="contra"
                  value={datosTrabajador.contra}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="codrol" className="form-label">
                  Roles:
                </label>
                <select
                  id="codrol"
                  name="codrol"
                  value={datosTrabajador.codrol}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {ListaRol.map((rol) => (
                    <option key={rol.codrol} value={rol.idRol}>
                      {rol.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div class="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-primary"
                    onClick={() => {
                      setMostrarModalRegistro(false); // Cerrar el modal después de eliminar
                    }}>
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
