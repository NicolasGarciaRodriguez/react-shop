import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./home.scss"
import { CartContext } from '../../context/CartContext'
import axios from 'axios'

const Home = () => {

  const [productsList, setproductsList] = useState([])
  const [loading, setLoading] = useState(null)
  const [loadingCart, setLoadingCart] = useState(null)
  const { cartItems, setCartItems } = useContext(CartContext)
  const [search, setSearch] = useState("")


  const addToCart = (cartItems, item) => {
    setLoadingCart(true)
    if (item.carrito > 0) {
      item.stock -= 1
      item.carrito += 1
      axios.put(`http://localhost:4000/products/${item.id}`, {
        ...item,
        stock: item.stock
      })
      .finally(() => {
        const itemAEliminar = cartItems.find((itemCarrito) => itemCarrito.id === item.id)
        let filtro = cartItems.filter(itemEnCarrito => itemEnCarrito !== itemAEliminar)
        if (filtro.length > 0) {
          setCartItems([...filtro, item])
          setLoadingCart(false)
        } else {
          setCartItems([item])
          setLoadingCart(false)
        }
      })
    } else {
      item.stock -= 1
      item.carrito += 1
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



  const handleChange = (ev) => {
    setSearch(ev.target.value)
    if (ev.target.value === "") {
      requestProducts()
    }
  }


  const searchProduct = (search) => {
    let searchResult = productsList.filter((itemInList) => {
      if (itemInList.name.toLowerCase().includes(search.toLowerCase())) {
        return itemInList
      }
    })
    setproductsList(searchResult)
  }


  return (
    <div className="product-list">
      <div className="search-bar">
        <input value={search} onChange={handleChange} placeholder="Busca tu producto" />
        <button onClick={() => searchProduct(search)}>Buscar</button>
      </div>
      {loading ? <p>Loading...</p> : null}
      <div className="list">
        {productsList.map((item) => {
          return (
              <div className="product" key={item.id}>
                <Link to={`/product/${item.id}`}>
                  <img src={item.imagen} alt={item.name} />
                  <h2>{item.name}</h2>
                  <p>{item.precio}€</p>
                </Link>
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
    </div>
  )
}

export default Home