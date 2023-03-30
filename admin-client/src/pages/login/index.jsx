import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginDispatch } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/authContext';
import "./styles.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const { isFetching, dispatch } = useContext(AuthContext)
  const Navigate = useNavigate()


  const handleLogin = (e) => {
    e.preventDefault()
    loginDispatch({ email, password }, dispatch)
      .then(() => Navigate("/"))
      .catch(res => console.log(res))
  }

  return (
    <div className='login'>
      <form className='loginForm'>
        <input
          type="email"
          placeholder='email' className='loginInput'
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password" placeholder='password' className='loginInput'
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className='loginButton'
          onClick={handleLogin}
          disabled={isFetching}
        >Login
        </button>
      </form>
    </div>
  )
}

export default Login