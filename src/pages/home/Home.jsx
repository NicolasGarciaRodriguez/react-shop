import React, { useContext, useEffect, useState } from 'react'
import "./home.scss"
import { CartContext } from '../../context/CartContext'
import axios from 'axios'

const Home = () => {

  const [productsList, setproductsList] = useState([])
  const [loading, setLoading] = useState(true)
  const { cartItems, setCartItems } = useContext(CartContext)



  const addToCart = (cartItems, item) => {
    setCartItems([...cartItems, item])
    axios.put(`http://localhost:4000/products/${item.id}`, {
      ...item,
      stock: item.stock - 1
    })
    console.log(item.stock)
  }
 

  const requestProducts = () => {
    try {
      fetch("http://localhost:4000/products")
      .then(items => items.json())
      .then(itemsJson => setproductsList(itemsJson))
      setLoading(false)
    } catch {
      console.error()
    }
  }

  useEffect(() => {
    requestProducts()
  }, [cartItems])


  return (
    <div className="product-list">
        {loading ? <p>Loading...</p> : null}
        {productsList.map((item) => {
          return (
            <div className="product" key={item.id}>
              <p>{item.id}</p>
              <h2>{item.name}</h2>
              <p>Precio: {item.precio}</p>
              {item.stock > 0  ? 
                <button onClick={() => addToCart(cartItems, item)}>Añadir al carrito</button>
                :
                <p>No stock</p>
              }
            </div>
          )
        })}
    </div>
  )
}

export default Home