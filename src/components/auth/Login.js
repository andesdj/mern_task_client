import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = (props) => {
  //Extrater context
  const alertaContext = useContext(AlertaContext);
  const authContext = useContext(AuthContext);
  //Extraer States y Func de los contexts
  const { alerta, mostrarAlerta } = alertaContext;
  const { iniciarSesion, autenticado, mensaje } = authContext;

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
    email: "",
    password: "",
  });
  const { email, password } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Validar campos vacíos
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //pasar al action
    iniciarSesion({ email, password });
  };
  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form dark">
        <h1>Iniciar sesión</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="text"
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
            <input
              type="submit"
              id="submit"
              className="btn btn-primario btn-block"
              value="Iniciar sesión"
            />
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener una cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
