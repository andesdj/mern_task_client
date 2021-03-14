import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //Obtener state del form
  const proyectosContext = useContext(proyectoContext);

  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError
  } = proyectosContext;

  //State nuevo proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });
  const { nombre } = proyecto;

  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario envia proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();
    //Validar campo vacio
    if (nombre === "") {
      mostrarError();
      return;
    }

    //Agregar al State
    agregarProyecto(proyecto);
    // guardar Proyecto submit

    //Reiniciar FORM
    guardarProyecto({
      nombre: "",
    });
  };

  const onClickFormulario = () => {
    mostrarFormulario();
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
      >
        Nuevo proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            name="nombre"
            className="input-text"
            value={nombre}
            placeholder="Nombre del proyecto"
            onChange={onChangeProyecto}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar proyecto"
          />
        </form>
      ) : null}

      {errorformulario 
      ? <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      : null
      }
    </Fragment>
  );
};

export default NuevoProyecto;
