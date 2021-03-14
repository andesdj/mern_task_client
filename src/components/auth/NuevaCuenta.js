import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";
const NuevaCuenta = (props) => {
  //Extrater context
  const alertaContext = useContext(AlertaContext);
  const authContext = useContext(AuthContext);
  //Extraer States y Func de los contexts
  const { alerta, mostrarAlerta } = alertaContext;
  const { registrarUsuario, autenticado, mensaje } = authContext;

  // En caso de que el usuario se haya registrado o sea un registro duplicado
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
 // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //State para login
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });
  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Validar campos vacíos
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //Password minimo 6 char
    if (password.length < 6 || confirmar < 6) {
      mostrarAlerta(
        "El password debe tener mínimo 6 caracteres",
        "alerta-error"
      );
      return;
    }

    //Password sean iguales
    if (password !== confirmar) {
      mostrarAlerta("la contraseña debe ser igual", "alerta-error");
      return;
    }

    //pasar al action
    registrarUsuario({ nombre, email, password });
  };
  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form dark">
        <h1>Crear una cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              vaue={nombre}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              vaue={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              vaue={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="confirmar">Confirma tu password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Tu password"
              vaue={confirmar}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              id="submit"
              className="btn btn-primario btn-block"
              value="Crear cuenta"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Ir a iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
