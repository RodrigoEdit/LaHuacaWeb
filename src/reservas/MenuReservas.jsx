import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Modal, Button, FormGroup } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

export const MenuReserva = () => {
  const [listaReserva, setlistaReserva] = useState([]);
  const [ReservaSeleccionado, setreservaSeleccionado] = useState(0);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [reservaEditar, setReservaEditar] = useState(null);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [datosReserva, setDatosReserva] = useState({
    idr: 0,
    fecha_inicio: "",
    fecha_fin: "",
    idcli: "",
    idtra: "",
    idh: "",
    estado: "",
  });

  const [listaClientes, setlistaClientes] = useState([]);
  const [listaHabitacion, setlistaHabitacion] = useState([]);
  const [listarTrabajador, setlistarTrabajador] = useState([]);
  useEffect(() => {
    traerreserva();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosReserva((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !datosReserva.fecha_inicio ||
      !datosReserva.fecha_fin ||
      !datosReserva.idcli ||
      !datosReserva.idh
    ) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("https://lahuacaapiofi.onrender.com/reserva/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosReserva),
      });

      if (response.ok) {
        toast.success("Los datos de la reserva se guardaron correctamente.");
        traerreserva();
        setDatosReserva({
          idr: 0,
          fecha_inicio: "",
          fecha_fin: "",
          idcli: "",
          idh: "",
          idtra: "",
          estado: "",
        });
        // Aquí puedes agregar la lógica adicional después de guardar los datos.
      } else {
        toast.error("Error al guardar los datos de la reserva.");
      }
    } catch (error) {
      toast.success(
        "Error al guardar los datos de la reseva. SERVIDOR REINICIAR"
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    traerreserva();
  }, []);

  const traerreserva = async () => {
    try {
      const response = await fetch("https://lahuacaapiofi.onrender.com/reserva/list");
      const data = await response.json();
      setlistaReserva(data);

      const responseClientes = await fetch(
        "https://lahuacaapiofi.onrender.com/cliente/list"
      );
      const dataClientes = await responseClientes.json();

      const responseHabitaciones = await fetch(
        "https://lahuacaapiofi.onrender.com/habitaciones/list"
      );
      const dataHabitaciones = await responseHabitaciones.json();

      const responseTrabajador = await fetch(
        "https://lahuacaapiofi.onrender.com/trabajador/list"
      );
      const dataTrabajador = await responseTrabajador.json();

      setlistaClientes(dataClientes);
      setlistaHabitacion(dataHabitaciones);
      setlistarTrabajador(dataTrabajador);
    } catch (error) {
      console.error("Error al obtener la lista de reservas:", error);
    }
  };

  const handleGuardarClick = async () => {
    let item = {
      idr: reservaEditar.idr,
      fecha_inicio: reservaEditar.fecha_inicio,
      fecha_fin: reservaEditar.fecha_fin,
      idcli: reservaEditar.idcli,
      idtra: reservaEditar.idtra,
      idh: reservaEditar.idh,
      estado: reservaEditar.estado,
    };
    try {
      const url = `https://lahuacaapiofi.onrender.com/reserva/update/${ReservaSeleccionado}`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      };

      const response = await fetch(url, options);
      if (response.ok) {
        console.log(reservaEditar);
        toast.success("Los datos de la reserva se actualizaron correctamente.");
        traerreserva();
        // Aquí podrías mostrar un mensaje de éxito o realizar alguna acción adicional si es necesario.
      } else {
        
        toast.error("Error al guardar los datos de la reserva.");
        // Aquí podrías mostrar un mensaje de error o realizar alguna acción adicional si es necesario.
      }
    } catch (error) {
      toast.error(
        "Error al guardar los datos de la reserva. SERVIDOR REINICIAR"
      );
    }
  };

  const eliminarreserva = async () => {
    try {
      // Realizar la eliminación del piloto
      console.log("Reserva seleccionado:", ReservaSeleccionado);
      if (ReservaSeleccionado) {
        const response = await fetch(
          `https://lahuacaapiofi.onrender.com/reserva/delete/${ReservaSeleccionado}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Eliminar el piloto de la lista
          const nuevaLista = listaReserva.filter(
            (Reserva) => Reserva.idr !== ReservaSeleccionado
          );
          setlistaReserva(nuevaLista);
          toast.success("Reserva eliminado correctamente.");
        } else {
          toast.error("Error al eliminar la reserva.");
        }
      }
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      toast.error("Error al eliminar la reserva. SERVIDOR REINICIAR");
    }

    // Cerrar el modal de confirmación
    setConfirmarEliminar(false);
    setreservaSeleccionado(null);
  };
  const getNombreCliente = (idCliente) => {
    const clienteEncontrada = listaClientes.find(
      (cliente) => cliente.idcli === idCliente
    );
    return clienteEncontrada ? clienteEncontrada.nombre : "";
  };
  const getNombreHabitacion = (idHbaitacion) => {
    const habitacionEncontrada = listaHabitacion.find(
      (habitacion) => habitacion.idh === idHbaitacion
    );
    return habitacionEncontrada ? habitacionEncontrada.numero : "";
  };

  const getNombreTrabajador = (idTrabajador) => {
    const trabajadorEncontrado = listarTrabajador.find(
      (trabajador) => trabajador.idt === idTrabajador
    );
    return trabajadorEncontrado ? trabajadorEncontrado.nombre : "";
  };

  const cantidad = listaReserva.length;

  return (
    <div className="div-home">
      <div>
        <h2 className="tittle-general">LISTADO DE RESERVAS</h2>
        <div className="CentrarBtn">
          <button
            type="button"
            className="btn-Crear"
            onClick={() => setMostrarModalRegistro(true)}
          >
            Crear Reservas
          </button>
        </div>
        <div className="contador">RESERVAS ACTUALES: {cantidad}</div>
        <br />
        <div className="container">
          <div className="row">
            {listaReserva.map((Reserva) => (
              <div key={Reserva.idr} className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body" id="div-general-listar">
                    {/* <h3 className="card-title">{Trabajador.nombre}</h3> */}
                    <p className="card-text">Id Reserva: {Reserva.idr}</p>
                    <p className="card-text">Estado : {Reserva.estado}</p>
                    <p className="card-text">
                      Fecha de inicio: {formatDate(Reserva.fecha_inicio)}
                    </p>
                    <p className="card-text">
                      Fecha de Fin: {formatDate(Reserva.fecha_fin)}
                    </p>
                    <p className="card-text">
                      Cliente: {getNombreCliente(Reserva.idcli)}
                    </p>
                    <p className="card-text">
                      Trabajador: {getNombreTrabajador(Reserva.idtra)}
                    </p>
                    <p className="card-text">
                      Id Habitacion: {getNombreHabitacion(Reserva.idh)}
                    </p>

                    <div
                      className="btn-group d-flex justify-content-center"
                      role="group"
                    >
                      <button
                        type="button"
                        className="btn btn-primary "
                        onClick={() => {
                          console.log("Clic en Editar");
                          setreservaSeleccionado(Reserva.idr);
                          setReservaEditar(Reserva); // Configurar el estado con los datos del cliente seleccionado
                          // Aquí puedes abrir el modal de edición si lo deseas
                        }}
                      >
                        <i class="fa-sharp fa-solid fa-pen-to-square" />
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger ms-4"
                        onClick={() => {
                          console.log("Clic en Eliminar");
                          setreservaSeleccionado(Reserva.idr);
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
            <p>¿Estás seguro de que deseas eliminar esta reserva?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                eliminarreserva();
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
          show={reservaEditar !== null}
          onHide={() => setReservaEditar(null)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar Reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {reservaEditar && (
              <FormGroup>
                <p>Id Reserva: {reservaEditar.idr}</p>

                <select
                  id="estado"
                  value={reservaEditar.estado}
                  className="form-control"
                  required
                  onChange={(e) =>
                    setReservaEditar({
                      ...reservaEditar,
                      estado: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona un estado</option>
                  <option value="Activo">Activo</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Finalizado">Finalizado</option>
                </select>

                <div className="form-group">
                  <label htmlFor="fecha_inicio">fecha de Inicio</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fecha_inicio"
                    value={reservaEditar.fecha_inicio}
                    onChange={(e) =>
                      setReservaEditar({
                        ...reservaEditar,
                        fecha_inicio: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fecha_fin">fecha de Fin</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fecha_fin"
                    value={reservaEditar.fecha_fin}
                    onChange={(e) =>
                      setReservaEditar({
                        ...reservaEditar,
                        fecha_fin: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="idcli">Id Cliente</label>
                  <select
                    type="text"
                    className="form-control"
                    id="idcli"
                    value={reservaEditar.idcli}
                    onChange={(e) =>
                      setReservaEditar({
                        ...reservaEditar,
                        idcli: e.target.value,
                      })
                    }
                  >
                    <option value="">Selecciona una categoría</option>
                    {listaClientes.map((cliente) => (
                      <option key={cliente.idcli} value={cliente.idcli}>
                        {cliente.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="idtra">Id Trabajador</label>
                  <select
                    type="text"
                    className="form-control"
                    id="idtra"
                    value={reservaEditar.idtra}
                    onChange={(e) =>
                      setReservaEditar({
                        ...reservaEditar,
                        idtra: e.target.value,
                      })
                    }
                  >
                    <option value="">Selecciona una trabajador</option>
                    {listarTrabajador.map((trabajador) => (
                      <option key={trabajador.idtra} value={trabajador.idt}>
                        {trabajador.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="idh">Id Habitacion</label>
                  <select
                    className="form-control"
                    id="idh"
                    value={reservaEditar.idh}
                    onChange={(e) =>
                      setReservaEditar({
                        ...reservaEditar,
                        idh: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Selecciona un numero de habitacion</option>
                    {listaHabitacion.map((habitacion) => (
                      <option key={habitacion.idh} value={habitacion.idh}>
                        {habitacion.numero}
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
                setReservaEditar(null); // Cerrar el modal después de editar
              }}
            >
              Guardar cambios
            </Button>
            <Button variant="secondary" onClick={() => setReservaEditar(null)}>
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
            <Modal.Title>Crear Nueva Reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body className="">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="estado" className="form-label">
                  Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={datosReserva.estado}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecciona un estado</option>
                  <option value="Activo">Activo</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Finalizado">Finalizado</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="fecha_inicio" className="form-label">
                  fecha de Inicio
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fecha_inicio"
                  name="fecha_inicio"
                  value={datosReserva.fecha_inicio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fecha_fin" className="form-label">
                  fecha de Fin
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fecha_fin"
                  name="fecha_fin"
                  value={datosReserva.fecha_fin}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="idcli" className="form-label">
                  Id Cliente
                </label>
                <select
                  id="idcli"
                  name="idcli"
                  value={datosReserva.idcli}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecciona un cliente</option>
                  {listaClientes.map((cliente) => (
                    <option key={cliente.idcli} value={cliente.idcli}>
                      {cliente.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="idtra">Id Trabajador</label>
                <select
                  name="idtra"
                  className="form-control"
                  id="idtra"
                  value={datosReserva.idtra}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una trabajador</option>
                  {listarTrabajador.map((trabaja) => (
                    <option key={trabaja.idtra} value={trabaja.idt}>
                      {trabaja.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="idh" className="form-label">
                  Id Habitacion
                </label>
                <select
                  id="idh"
                  name="idh"
                  value={datosReserva.idh}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecciona un numero de habitacion</option>
                  {listaHabitacion.map((habitacion) => (
                    <option key={habitacion.idh} value={habitacion.idh}>
                      {habitacion.numero}
                    </option>
                  ))}
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
