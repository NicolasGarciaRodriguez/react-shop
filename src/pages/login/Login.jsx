import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import "./login.scss"
const INITIAL_STATE = {
  email: "",
  password: ""
};

const Login = () => {

  const navigate = useNavigate()
  const [formData, setformData] = useState(INITIAL_STATE)
  const {setUserLogged} = useContext(LoginContext)
  const [loginError, setLoginError] = useState(false)


  const loginUser = (formData) => {
    fetch("http://localhost:4000/users").then((res) => res.json()).then((userJSON) => {
      const user = userJSON
      const userExist = user.find((el) => el.password === formData.password && el.email === formData.email)
      if (userExist) {
        setUserLogged(userExist)
        console.log("Log correcto")
        navigate("/")
      } else {
        console.log("Log incorrecto")
        setLoginError(true)
      }
    })
  }




  const submitForm = (ev) => {
    ev.preventDefault()
    loginUser(formData)
  }

  const changeInput = (ev) => {
    const { name, value } = ev.target
    setformData({...formData, [name]: value})
  }

  return (
    <form className="login-form" onSubmit={submitForm}>
      <div className="email-loginform">
        <label>email</label>
        <input name="email" type="text" onChange={changeInput} value={formData.email}></input>
      </div>
      <div className="password-loginform">
        <label>password</label>
        <input name="password" type="password" onChange={changeInput} value={formData.password}></input>
      </div>

      <button type="submit">Log in</button>
      {loginError === true ? <p>User no exist</p> : null}
    </form>
  )
}

export default Login