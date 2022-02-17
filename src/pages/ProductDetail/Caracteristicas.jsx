import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Caracteristicas = () => {

    const { itemId } = useParams()
    const [item, setItem] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getItem() {
            try {
              const request = await fetch(`http://localhost:4000/products/${itemId}`);
              const response = await request.json();
              setItem(response);
              setLoading(false);
            } catch (error) {
              setError(error);
              setLoading(false);
            }
          }
          getItem();
    }, [])

  return (
      <>
        {error ? <p>Error inesperado</p> : null}
        {loading ? 
        <p>Loading...</p>
        :
        <div>
            <p>{item.caracteristicas}</p>
        </div>
        }
      </>
  )
}

export default Caracteristicas