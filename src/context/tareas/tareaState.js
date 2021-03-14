import React, {  useReducer } from "react";
import clienteAxios from "../../config/axios";

import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const InitialState = {
    tareas: [],
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada:null,
  };

  //Dispatch y el State
  const [state, dispatch] = useReducer(TareaReducer, InitialState);

  // CREAR FUNCIONES

  //Obtener tareas de  un proyecto se le psa id del proyecto
  const obtenerTareas = async (proyecto) => {
    try {
      
      const resultado= await clienteAxios.get("/api/tareas",{params:{proyecto}});
      console.log(resultado);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
      
    } catch (error) {
      console.log(error);
    }
    
  };

  // Recibe un obj  le pone ID Agrega en el State de tares la tarea.
  const agregarTarea = async (tarea) => {
    console.log(tarea);
    try {
    const resultado= await clienteAxios.post("/api/tareas", tarea)
      console.log(resultado);
    } catch (error) {
      console.log(error);
    }
   
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea,
    });
  };

  // Valida si hay error en el submit de crear tarea  si es true pone aviso
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  //Eliminar tarea por su ID
  const eliminarTarea= async (id,proyecto)=>{
    console.log(id);
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, {params:{proyecto}})
       dispatch({
       type:ELIMINAR_TAREA,
       payload:id
     })
      
    } catch (error) {
      console.log(error);
    }
 
  }



// Extraer la tarea atual para edición
const guardarTareaActual=tarea=>{
  dispatch({
    type: TAREA_ACTUAL,
    payload:tarea

  })
}

//Edita, omodifica una tarea
const actualizarTarea = async tarea=>{
  
  try {
    const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
  console.log(resultado);
    dispatch({
      type: ACTUALIZAR_TAREA,
      payload:resultado.data.tarea
    });
    
  } catch (error) {
    console.log(error);
  }
  
}

//Elimina la tarea seleccoonda
const  limpiarTarea=()=>{
  dispatch({type:LIMPIAR_TAREA}  )
}


  // -------------------------------------------------------
  return (
    <TareaContext.Provider
      value={{
        //Func
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,

        //States
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada:state.tareaseleccionada,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
