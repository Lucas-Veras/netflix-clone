import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { loginDispatch } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/authContext";
import "./styles.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e: any) => {
    e.preventDefault();
    loginDispatch({ email, password }, dispatch);
  };
  return (
    <div className="loginPage">
      <div className="top">
        <div className="wrapper">
          <Link to="/register" className="netflixLinkLogo">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="container">
        <form className="loginForm">
          <h1 className="loginFormTitle">Entrar</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Entrar
          </button>
          <span>
            Novo por aqui?{" "}
            <Link to="/register">
              <b>Registre-se agora.</b>
            </Link>
          </span>
          <small>
            Esta página é protegida pelo Google reCAPTCHA para garantir que você
            não é um robô. <b className="plus">Saiba mais.</b>
          </small>
        </form>
      </div>
    </div>
  );
}
