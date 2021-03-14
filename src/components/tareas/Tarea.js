import React, { useContext } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";
const Tarea = ({ tarea }) => {
  const proyectosContext = useContext(proyectoContext);
  const TareasContext = useContext(TareaContext);

  //Extraer el proyecto
  const { proyecto } = proyectosContext;
  const [proyectoActual] = proyecto;

  const { eliminarTarea, obtenerTareas , actualizarTarea, guardarTareaActual} = TareasContext;

  // Fn se ejecuta cuando el usuario presiona el boton eliminar tarea, obtiene id de la tarea, la borra y pide llamar las tareas del proyecto
  const tareaEliminar = (id) => {
    eliminarTarea(id,proyectoActual._id);
    obtenerTareas(proyectoActual._id);
  };


  //Funcion que modifica el estado de la tarea
  const cambiaEstado=tarea=>{
    if(tarea.estado){
      tarea.estado=false;
    } else {
      tarea.estado=true;
    }
    actualizarTarea(tarea);
  }

  // Agregar una tarea actual al state
  const seleccionarTarea =tarea=>{
    guardarTareaActual(tarea);
  }

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo"   onClick={()=>cambiaEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button type="button" className="incompleto" onClick={()=>cambiaEstado(tarea)}>
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button type="button" className="btn btn-primario" onClick={()=>seleccionarTarea(tarea)}>
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminar(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
