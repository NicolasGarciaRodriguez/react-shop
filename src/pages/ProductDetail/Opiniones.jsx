import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext'


const Opiniones = () => {

    const {userLogged} = useContext(LoginContext)

    const INITIAL_STATE = {
        titulo: "",
        opinion: ""
    }

    const { itemId } = useParams()
    const [item, setItem] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingComent, setLoadingComent] = useState(false)
    const [formData, setFormData] = useState(INITIAL_STATE)



    const handleChange = (ev) => {
        const { name, value } = ev.target
        setFormData({...formData, [name]: value})
        console.log(formData)
    }


    const postOpinion = (formData) => {
        setLoadingComent(true)
        axios.post(`http://localhost:4000/products/${itemId}`, {
            name: userLogged.name,
            titulo: formData.titulo,
            opinion: formData.opinion
        })
        setLoadingComent(false)
        
    }

    const submitForm = (ev) => {
        ev.preventDefaul()
        postOpinion(formData)
    }


    useEffect(() => {
        async function getItem() {
            try {
              const request = await fetch(`http://localhost:4000/products/${itemId}`);
              const response = await request.json();
              setItem(response.opiniones);
              setLoading(false);
            } catch (error) {
              setError(error);
              setLoading(false);
            }
          }
          getItem();
    }, [loadingComent])
    
  return (
    <>
    {error ? <p>Error inesperado</p> : null}
    {loading ? 
    <p>Loading...</p>
    :
    <div>
        {item.map((op) => {
            return(
                <div key={op.opinionId}>
                    <h4>{op.name}</h4>
                    <p>{op.titulo}</p>
                    <p>{op.opinion}</p>
                </div>
            )
        })}
    </div>
    }
    
    <form onSubmit={submitForm}>
        {userLogged !== null ?
        <h2>Dinos que opinas {userLogged.name}</h2>
        : 
        <h2>Dinos que opinas</h2>}
        <input type="text" name="titulo" placeholder="Añade un titulo" value={formData.titulo} onChange={handleChange}></input>
        <input type="text" name="opinion" placeholder="Añade una opinion" value={formData.opinion} onChange={handleChange}></input>
        {userLogged !== null ?
        <button type="sumit">Comentar</button>
        :
        <button disabled>Comentar</button>}
    </form>
  </>
  )
}

export default Opiniones