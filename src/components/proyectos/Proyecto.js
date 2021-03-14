import React , {useContext} from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
const Proyecto = ({proyecto}) => {

    //Obtener state del form
    const proyectosContext = useContext(proyectoContext);
    const tareasContext = useContext(tareaContext);
    const {proyectoActual } = proyectosContext;
   

    const {obtenerTareas} = tareasContext

    //Funcion para agregar proyecto actual y obtener las tareas : 2 fuc
    const seleccionarProyecto=id=>{
      
      // 1 Fija proyecto actual
      proyectoActual(id);
      
      // 2 Filtrar las tareas cuando se de click
      obtenerTareas(id);

    }

    return (
        <li><button
        type="button"
        className="btn btn-blank"
        onClick={()=>seleccionarProyecto(proyecto._id)}
        >{proyecto.nombre}</button></li>
      );
}
 
export default Proyecto;