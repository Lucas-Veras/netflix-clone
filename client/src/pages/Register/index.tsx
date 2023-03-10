//import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import netflixLogo from "../../assets/netflixLogo.png";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const usernameRef = useRef<any>();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e: any) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      //  await axios.post("auth/register", { email,username, password });
      navigate("/login");
    } catch (err) {}
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={netflixLogo} alt="netflix" />
          <button className="loginButton">Entrar</button>
        </div>
      </div>
      <div className="container">
        <h1>Filmes, séries e muito mais. Sem limites.</h1>
        <h2>Assista onde quiser. Cancele quando quiser.</h2>
        <p>
          Quer assistir? Informe seu email para criar ou reiniciar sua
          assinatura.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Vamos lá
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
