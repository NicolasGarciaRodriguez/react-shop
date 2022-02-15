import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./register.scss"

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}



const Register = () => {

const navigate = useNavigate()
const [formData, setFormData] = useState(INITIAL_STATE)
const [registerError, setRegisterError] = useState(null)
const [loading, setLoading] = useState(false)


const handleChange = (ev) => {
  const {name, value} = ev.target
  setFormData({...formData, [name]: value})
}



const postUser = (formData) => {
  axios.post("http://localhost:4000/users", {
    name: formData.name,
    email: formData.email,
    password: formData.password
  })
  setRegisterError(false)
  console.log("Registro correcto")
  navigate("/login")
}


const registerUser = (formData) => {
  setLoading(true)
  axios.get("http://localhost:4000/users")
  .then((res) => {
    const users = res.data
    const userExist = users.find((user) => formData.email === user.email)
    if (userExist) {
      setRegisterError(true)
      console.log("Registro incorrecto")
    } else {
        postUser(formData)
    }
  })
  .finally(() => setLoading(false))
  .catch((err) => console.log(err))
}


const submitForm = (ev) => {
  ev.preventDefault()
  registerUser(formData)
}


  return (
    <>
    <div className="register-page">
      {loading ? 
      <p>Loading...</p>
      :
      <form className="register-form" onSubmit={submitForm}>
      <div className="name-registerform">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange}></input>
      </div>

      <div className="email-registerform">
        <label>Email</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange}></input>
      </div>
      <div className="password-registerform">
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange}></input>
      </div>
      <button type="submit">Register</button>
      {registerError ? <p>User already exist</p> : null}
    </form>}
    </div>
    </>
  )
}

export default Register