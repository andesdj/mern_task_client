import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";
const FormTarea = () => {
  //Obtener state del form
  const proyectosContext = useContext(proyectoContext);
  const TareasContext = useContext(TareaContext);

  const { proyecto } = proyectosContext;
  const {
    errortarea,
    tareaseleccionada,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = TareasContext;

  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  //Effect que  Detecta tarea seleccionda
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  //extraer nombre de ña tarea
  const { nombre } = tarea;

  if (!proyecto) return null;

  const [proyectoActual] = proyecto;

  //Leer los valores del form
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //Revisar si es edicion o es nueva tarea
    if (tareaseleccionada === null) {
      //Agregar tarea al state de tareas
      console.log(proyectoActual._id);
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      //Tarea existente no se agrega. se  edita con un nievo TYPE
      actualizarTarea(tarea);
      //Elimina tarea seleccionada del state
      limpiarTarea();

    }

    //Obtener tareas del prpoyecto
    obtenerTareas(proyectoActual._id);

    //Reiniciar tarea
    guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            name="nombre"
            onChange={handleChange}
            value={nombre}
            className="input-text"
            placeholder="El nombre de tu tarea"
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            value={tareaseleccionada ? "Editar tarea" : "Agregar tarea"}
            className="btn btn-block btn-primario btn-submit"
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
