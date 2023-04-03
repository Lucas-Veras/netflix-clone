import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import netflixLogo from "../../assets/netflixLogo.png";
import { api } from "../../services/api";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import WhiteLoading from "../../components/WhiteLoading";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [emailPassed, setEmailPassed] = useState(false);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  console.log(emailPassed);
  console.log(email);

  const handleStart = async () => {
    setLoading(true);
    await api
      .post("/auth/verify-email", { email: email })
      .then((res) => {
        if (res.data) {
          setEmailPassed(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.errors[0]);
        setLoading(false);
      });
  };

  const handleFinish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    await api
      .post("/auth/register", { email, username, password })
      .then(() => {
        setLoading(false);
        Navigate("/login");
      })
      .catch(() => {
        setError("Houve um erro ao registrar, tente novamente.");
        setLoading(false);
      });
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={netflixLogo} alt="netflix" />
          <Link to="/login" className="loginButton">
            Entrar
          </Link>
        </div>
      </div>
      <div className="container text-center">
        <h1>Filmes, séries e muito mais. Sem limites.</h1>
        <h2>Assista onde quiser. Cancele quando quiser.</h2>
        <p>
          Quer assistir? Informe seu email para criar ou reiniciar sua
          assinatura.
        </p>
        {!emailPassed ? (
          <>
            <div className="input">
              <input
                type="email"
                className={error ? "borderError email" : "email"}
                placeholder="email address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="registerButton"
                onClick={handleStart}
                disabled={loading}
              >
                {loading ? (
                  <WhiteLoading width="40px" />
                ) : (
                  <>
                    <span>Vamos lá</span>
                    <ArrowForwardIosIcon />
                  </>
                )}
              </button>
            </div>
            {error && <span className="error">{error}</span>}
          </>
        ) : (
          <form className="input">
            <input
              type="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="registerButton"
              onClick={handleFinish}
              disabled={loading}
            >
              {loading ? (
                <WhiteLoading width="40px" />
              ) : (
                <>
                  <span>Cadastrar-se</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
