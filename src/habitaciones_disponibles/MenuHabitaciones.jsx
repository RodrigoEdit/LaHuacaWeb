import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Modal, Button, FormGroup } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

export const MenuHabitaciones = () => {
  const [listaHabitacion, setlistaHabitacion] = useState([]);
  const [HabitacionSeleccionado, sethabitacionSeleccionado] = useState(0);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [habitacionEditar, setHabitacionEditar] = useState(null);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [datosHabitacion, setDatosHabitacion] = useState({
    idh: 0,
    idc: "",
    numero: "",
    precio: "",
    estado: "",
  });
  const [listaCategorias, setListaCategorias] = useState([]);

  useEffect(() => {
    traerhabitacion();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosHabitacion((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !datosHabitacion.idc ||
      !datosHabitacion.numero ||
      !datosHabitacion.precio ||
      !datosHabitacion.estado === ""
    ) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("https://lahuacaapiofi.onrender.com/habitaciones/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosHabitacion),
      });

      if (response.ok) {
        toast.success("Los datos de la habitacion se guardaron correctamente.");
        traerhabitacion();
        setDatosHabitacion({
          idh: 0,
          idc: "",
          numero: "",
          precio: "",
          estado: "",
          reservas: [],
        });
        // Aquí puedes agregar la lógica adicional después de guardar los datos.
      } else {
        console.log(datosHabitacion);
        toast.error("Error al guardar los datos de la habitacion.");
      }
    } catch (error) {
      toast.success(
        "Error al guardar los datos de la habitacion. SERVIDOR REINICIAR"
      );
    }
  };

  const traerhabitacion = async () => {
    try {
      const response = await fetch("https://lahuacaapiofi.onrender.com/habitaciones/list");
      const data = await response.json();
      setlistaHabitacion(data);

      // Obtener la lista de categorías y almacenarla en el estado listaCategorias
      const responseCategorias = await fetch(
        "https://lahuacaapiofi.onrender.com/categoria/list"
      );
      const dataCategorias = await responseCategorias.json();
      setListaCategorias(dataCategorias);
    } catch (error) {
      console.error("Error al obtener la lista de habitaciones:", error);
    }
  };

  const handleGuardarClick = async () => {
    let item = {
      idh: habitacionEditar.idh,
      idc: habitacionEditar.idc,
      numero: habitacionEditar.numero,
      precio: habitacionEditar.precio,
      estado: habitacionEditar.estado,
    };
    console.warn("item", item);
    try {
      const url = `https://lahuacaapiofi.onrender.com/habitaciones/update/${HabitacionSeleccionado}`;
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
          "Los datos de la habitacion se actualizaron correctamente."
        );
        traerhabitacion();
        // Aquí podrías mostrar un mensaje de éxito o realizar alguna acción adicional si es necesario.
      } else {
        toast.error("Error al guardar los datos de la habitacion.");
        // Aquí podrías mostrar un mensaje de error o realizar alguna acción adicional si es necesario.
      }
    } catch (error) {
      toast.error(
        "Error al guardar los datos de la habitacion. SERVIDOR REINICIAR"
      );
    }
  };

  const eliminarHabitacion = async () => {
    try {
      // Realizar la eliminación del piloto
      console.log("Habitacion seleccionada:", HabitacionSeleccionado);
      if (HabitacionSeleccionado) {
        const response = await fetch(
          `https://lahuacaapiofi.onrender.com/habitaciones/delete/${HabitacionSeleccionado}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Eliminar el piloto de la lista
          const nuevaLista = listaHabitacion.filter(
            (habitacion) => habitacion.idh !== HabitacionSeleccionado
          );
          setlistaHabitacion(nuevaLista);
          toast.success("Habitacion eliminado correctamente.");
        } else {
          toast.error("Error al eliminar la Habitacion.");
        }
      }
    } catch (error) {
      console.error("Error al eliminar la habitacion:", error);
      toast.error("Error al eliminar la habitacion. SERVIDOR REINICIAR");
    }

    // Cerrar el modal de confirmación
    setConfirmarEliminar(false);
    sethabitacionSeleccionado(null);
  };

  const cantidad = listaHabitacion.length;

  const getNombreCategoria = (idc) => {
    const categoriaEncontrada = listaCategorias.find(
      (categoria) => categoria.idc === idc
    );
    return categoriaEncontrada ? categoriaEncontrada.categoria : "";
  };

  return (
    <div className="div-home">
      <div className="BodyCliente">
        <div className="CentrarBtn">
          <button
            type="button"
            className="btn-Crear"
            onClick={() => setMostrarModalRegistro(true)}
          >
            Crear Habitacion
          </button>
        </div>

        <div className="contador">HABITACIONES ACTUALES: {cantidad}</div>
        <br />
        <div className="container">
          <div className="row">
            {listaHabitacion.map((habitacion) => (
              <div
                key={habitacion.idh}
                id="container-habitaciones"
                className={"col-md-4 mb-4"}
              >
                <div
                  className={`card-body ${
                    parseInt(habitacion.estado) === 1
                      ? "div-disponible"
                      : parseInt(habitacion.estado) === 2
                      ? "div-pendiente"
                      : "div-no-disponible"
                  }`}
                >
                  <p
                    className={`card-text-estad ${
                      parseInt(habitacion.estado) === 1
                        ? "texto-disponible"
                        : parseInt(habitacion.estado) === 2
                        ? "texto-pendiente"
                        : parseInt(habitacion.estado) === 0
                        ? "texto-no-disponible"
                        : "texto-desconocido"
                    }`}
                  >
                    Estado:{" "}
                    {parseInt(habitacion.estado) === 1
                      ? "Disponible "
                      : parseInt(habitacion.estado) === 2
                      ? "Pendiente "
                      : parseInt(habitacion.estado) === 0
                      ? "No disponible "
                      : "Estado desconocido"}
                      <i class="fa-solid fa-bed"></i>
                  </p>
                  <div className="container">
                    <p className="card-text-numero">
                      Número: {habitacion.numero}
                    </p>
                    <div className="alineaciones-div">
                      <p className="card-text-categoria">
                        Categoría: {getNombreCategoria(habitacion.idc)}
                      </p>
                      <p className="card-text-precio">S/ {habitacion.precio}</p>
                    </div>

                    <div
                      className="btn-group d-flex justify-content-center"
                      role="group"
                    >
                      <button
                        type="button"
                        id="btn-editar"
                        className="btn"
                        onClick={() => {
                          console.log("Clic en Editar");
                          sethabitacionSeleccionado(habitacion.idh);
                          setHabitacionEditar(habitacion); // Configurar el estado con los datos del cliente seleccionado
                          // Aquí puedes abrir el modal de edición si lo deseas
                        }}
                      >
                        <i class="fa-sharp fa-solid fa-pen-to-square"></i>
                      </button>

                      <button
                        type="button"
                        id="btn-eliminar"
                        className="btn ms-2"
                        onClick={() => {
                          console.log("Clic en Eliminar");
                          sethabitacionSeleccionado(habitacion.idh);
                          setConfirmarEliminar(true);
                        }}
                      >
                        <i class="fa-solid fa-trash"></i>
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
            <p>¿Estás seguro de que deseas eliminar esta habitacion?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                eliminarHabitacion();
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
          show={habitacionEditar !== null}
          onHide={() => setHabitacionEditar(null)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar Habitacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {habitacionEditar && (
              <FormGroup>
                <p>Id Habitacion: {habitacionEditar.idh}</p>
                <div className="form-group">
                  <label htmlFor="idc">Categoría</label>
                  <select
                    className="form-control"
                    id="idc"
                    value={habitacionEditar.idc}
                    onChange={(e) =>
                      setHabitacionEditar({
                        ...habitacionEditar,
                        idc: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Selecciona una categoría</option>
                    {listaCategorias.map((categoria) => (
                      <option key={categoria.idc} value={categoria.idc}>
                        {categoria.categoria}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="numero">Número</label>
                  <input
                    type="text"
                    className="form-control"
                    id="numero"
                    value={habitacionEditar.numero}
                    onChange={(e) =>
                      setHabitacionEditar({
                        ...habitacionEditar,
                        numero: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="precio">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    id="precio"
                    value={habitacionEditar.precio}
                    onChange={(e) =>
                      setHabitacionEditar({
                        ...habitacionEditar,
                        precio: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="estado" className="form-label">
                    Estado
                  </label>
                  <select
                    id="estado"
                    name="estado"
                    className="form-control"
                    value={habitacionEditar.estado}
                    onChange={(e) =>
                      setHabitacionEditar({
                        ...habitacionEditar,
                        estado: e.target.value,
                      })
                    }
                  >
                    <option value="2">Pendiente</option>
                    <option value="1">Disponible</option>
                    <option value="0">No disponible</option>
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
                setHabitacionEditar(null); // Cerrar el modal después de editar
              }}
            >
              Guardar cambios
            </Button>
            <Button
              variant="secondary"
              onClick={() => setHabitacionEditar(null)}
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
            <Modal.Title>Crear Nueva habitacion</Modal.Title>
          </Modal.Header>
          <Modal.Body className="">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="idc" className="form-label">
                  Categoría
                </label>
                <select
                  id="idc"
                  name="idc"
                  value={datosHabitacion.idc}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {listaCategorias.map((categoria) => (
                    <option key={categoria.idc} value={categoria.idc}>
                      {categoria.categoria}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="numero" className="form-label">
                  Número
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="numero"
                  name="numero"
                  value={datosHabitacion.numero}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="precio" className="form-label">
                  Precio
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="precio"
                  name="precio"
                  value={datosHabitacion.precio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="estado" className="form-label">
                  Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={datosHabitacion.estado}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecciona el estado</option>
                  <option value="2">Pendiente</option>
                  <option value="1">Disponible</option>
                  <option value="0">No disponible</option>
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
