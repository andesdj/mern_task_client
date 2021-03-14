import React, { useReducer } from "react";
import AlertaReducer from "./alertaReducer";
import AlertaContext from "./alertaContext";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertaState = (props) => {
  const initialState = {
    alerta: null,
  };

  const [state, dispatch] = useReducer(AlertaReducer, initialState);

  //Funciones
  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: { msg, categoria },
    });

    //Limpiar la alerta
    setTimeout(()=>{
        dispatch({
            type: OCULTAR_ALERTA,
        })
    }, 5000);
  };
  return (
    <AlertaContext.Provider 
    value={{
        //State
        alerta: state.alerta,
        //FN
        mostrarAlerta,
    }}
    
    >{props.children}
    
    </AlertaContext.Provider>
  );
};

export default AlertaState;
