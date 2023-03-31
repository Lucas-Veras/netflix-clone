import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../context/userContext/apiCall";
import { UserContext } from "../../context/userContext/userContext";
import "./newUser.css";

export default function NewUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [globalError, setGlobalError] = useState("");
  const { dispatch } = useContext(UserContext);
  const Navigate = useNavigate();

  const passwordDontMatch = () => {
    if (password !== confirmPassword) {
      setErrorPasswordMessage("Password does not match");
      return true;
    }
    setErrorPasswordMessage("")
    return false;
  };

  const handlePasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError("")

    if (passwordDontMatch()) {
      return
    }
    const user = {
      username,
      email,
      password,
    };

    createUser(user, dispatch).then(err => {
      if (typeof err === "string"){
        setGlobalError(err)
      } else {
        setConfirmPassword("")
        setPassword("")
        setEmail("")
        setUsername("")
        Navigate("/users")
      }
    })
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="john"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="newUserItem">
          <label>Confirm password</label>
          <input
            type="password"
            placeholder="******"
            onChange={handlePasswordChange}
            value={confirmPassword}
          />
          {errorPasswordMessage &&
            <p className="errorMessage">
              {errorPasswordMessage}
            </p>
          }
        </div>
        <div>
          {globalError && <p className="errorMessage">{globalError}</p>}
          <button className="newUserButton" onClick={handleSubmit}>Create</button>
        </div>
      </form>
    </div>
  );
}
