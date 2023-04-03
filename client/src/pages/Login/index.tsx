import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginDispatch } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/authContext";
import "./styles.css";
import classNames from "classnames";
import WhiteLoading from "../../components/WhiteLoading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [allError, setAllError] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const classesEmail = classNames({
    borderError: !!emailError || !!allError,
    "mb-20": !!!emailError || !!allError,
  });

  const classesPassword = classNames({
    borderError: !!passwordError || !!allError,
    "mb-20": !!!passwordError || !!allError,
  });

  const handleLogin = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setEmailError("");
    setPasswordError("");
    setAllError("");
    loginDispatch({ email, password }, dispatch).then((res) => {
      if (res.email) setEmailError(res.email);
      if (res.password) setPasswordError(res.password);
      if (res[0]) setAllError(res[0]);
      setLoading(false);
    });
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
            className={classesEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error mb-20">{emailError}</p>}
          <input
            type="password"
            placeholder="Senha"
            className={classesPassword}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error mb-20">{passwordError}</p>}
          {allError && <p className="error mb-20">{allError}</p>}
          <button className="loginButton" onClick={handleLogin} disabled={loading}>
            {loading ? <WhiteLoading width="40px" /> : <span>Entrar</span>}
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
