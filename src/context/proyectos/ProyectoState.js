import React, { useReducer } from "react";
// import { v4 as uuidv4 } from 'uuid';
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./ProyectoReducer";

import clienteAxios from "../../config/axios";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR,
} from "../../types";

//Definir un estado inicial de todo el context
const ProyectoState = (props) => {
  // const proyectos = [
  //   { id: "1", nombre: "Aprender REACT JS" },
  //   { id: "2", nombre: "Curso NodeJS" },
  //   { id: "3", nombre: "Repasar Mongo" },
  //   { id: "4", nombre: "MERN Stack" },
  // ];
  const initialState = {
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null,

    proyectos: [],
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //Serie de funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data.proyectos,
      });
    }  
    catch (error) {
      const alerta={
        msg: "Hubo un error",
        categoria: "alerta-error"
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta

      })
    }

    /* METODO ANTIOGUO para guardar en memoria
    dispatch({
          type: OBTENER_PROYECTOS,
          payload: proyectos,
        });
   */
  };

  const agregarProyecto = async (proyecto) => {
    //Mongo ta va a crear los ID
    /*
      dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
          })
     */

    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      // insertar proyecto en el STATE
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  //Validar el form por errores

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };
  //Seleccion ael proyecto que el user dio clic

  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  //Elimina un proyecto
  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        //States Data
        formulario: state.formulario,
        proyectos: state.proyectos,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,

        //Functions
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};
export default ProyectoState;
