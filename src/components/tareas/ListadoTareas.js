import React, { Fragment,  useContext } from "react";
import  {CSSTransition, TransitionGroup} from 'react-transition-group';

import proyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";
import Tarea from "./Tarea";

const ListadoTareas = () => {
  //Obtener state del form
  const proyectosContext = useContext(proyectoContext);
  const TareasContext = useContext(TareaContext);

  const { proyecto, eliminarProyecto } = proyectosContext;

  const { tareasproyecto } = TareasContext;

  // Si no hay proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  // array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id);
  };
  return (
    <Fragment>
      <h1>
        Proyecto: <span>{proyectoActual.nombre}</span>
      </h1>
      <ul className="listado-tareas">
        {tareasproyecto.length === 0 
        ? ( <li className="tarea">No hay tareas</li>)
        : 
        <TransitionGroup>
           {tareasproyecto.map(tarea => (
              <CSSTransition
                key={tarea._id} 
                timeout={300}
                classNames="tarea"
              >
                <Tarea 
                  tarea={tarea} 
                />
              </CSSTransition>
              ))}
          </TransitionGroup>
        }
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickEliminar}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
