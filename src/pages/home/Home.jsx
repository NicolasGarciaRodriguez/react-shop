import React, { useContext, useEffect, useState } from 'react'
import "./home.scss"
import { CartContext } from '../../context/CartContext'
import axios from 'axios'

const Home = () => {

  const [productsList, setproductsList] = useState([])
  const [loading, setLoading] = useState(null)
  const [loadingCart, setLoadingCart] = useState(null)
  const { cartItems, setCartItems } = useContext(CartContext)



  const addToCart = (cartItems, item) => {
    setLoadingCart(true)
    item.stock -= 1
    axios.put(`http://localhost:4000/products/${item.id}`, {
      ...item,
      stock: item.stock
    })
    .finally(() => {
      setCartItems([...cartItems, item])
      setLoadingCart(false)
    })
    .catch((err) => console.log(err))
  }
 

  const requestProducts = () => {
    setLoading(true)
    fetch("http://localhost:4000/products")
    .then(items => items.json())
    .then(itemsJson => setproductsList(itemsJson))
    .finally(() => {
      setLoading(false)
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    requestProducts()
  }, [cartItems])


  return (
    <div className="product-list">
        {loading ? <div className="loading"><p>Loading...</p></div> : null}
        {productsList.map((item) => {
          return (
            <div className="product" key={item.id}>
              <h2>{item.name}</h2>
              <p>Precio: {item.precio}</p>
              {item.stock > 0 && !loadingCart ? 
                <button onClick={() => addToCart(cartItems, item)}>Añadir al carrito</button>
                : loadingCart ?
                <button disabled>adding to cart...</button>
                : item.stock <=0 |loadingCart ?
                <p>No stock</p>
                : null}
            </div>
          )
        })}
    </div>
  )
}

export default Home