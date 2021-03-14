import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import AlertaContext from "../../context/alertas/alertaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoProyectos = () => {
  //Extraer proyectos del state inicial
  const proyectosContext = useContext(proyectoContext);
  const {mensaje,  proyectos, obtenerProyectos } = proyectosContext;

  const alertaContext = useContext(AlertaContext);
  const {alerta, mostrarAlerta}= alertaContext;

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    // Si hay error
    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }

    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);
  // Si proyectos OBJ contoene elementos
  if (proyectos.length === 0)
    return <p className="proyectos">No hay proyectos, inicia creando uno</p>;

  return (
    <ul className="listado-proyectos">
      {alerta? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>

      ) :null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition
          key={proyecto._id}
          timeout={500}
          classNames="proyecto"
          >
              <Proyecto 
              proyecto={proyecto}
               />
          </CSSTransition>
         
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
