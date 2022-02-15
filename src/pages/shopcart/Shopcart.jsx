import React, { useContext, useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { CartContext } from '../../context/CartContext'
import { LoginContext } from '../../context/LoginContext';
import axios from 'axios'
import "./shopcart.scss";



const Shopcart = () => {

  const { cartItems, setCartItems } = useContext(CartContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const {userLogged} = useContext(LoginContext)
  let itemPrices = []



  const deleteItem = (item, index) => {

    // Elimina el item
    const cartItemsTemp = [...cartItems]
    cartItemsTemp.splice(index, 1)
    setCartItems(cartItemsTemp)

    // Elimina el precio
    itemPrices.splice(index, 1)

    // Devuelve el stock
    axios.put(`http://localhost:4000/products/${item.id}`, {
      ...item,
      stock: item.stock + 1
    })
  }



  useEffect(() => {
    setTotalPrice(itemPrices.reduce((a, b) => a + b, 0))
  }, [itemPrices])


  return (
    <div className="shopcart">
        <h1>shopcart</h1>
        {cartItems.length === 0 ? 
        <p>(El carrito está vacio)</p>
      : null}
        {cartItems.map((item, index) => {
          itemPrices.push(item.precio)
          return (
            <div key={item.id + Math.random(100, 1000)}>
              <h3>{item.name}</h3>
              <p>Precio: {item.precio}</p>
              <p>Stock: {item.stock}</p>
              <button onClick={() => deleteItem(item, index)}>Remove</button>
            </div>
          )
        })}
        {totalPrice > 0  && userLogged === null ?
        <>
          <h3>Precio total: {totalPrice}</h3>
          <button disabled>Pagar</button>
          <p>debes esta logeado para pagar</p>
        </>
          : null}
          {userLogged !== null && cartItems.length > 0 ?
          <>
          <h3>Precio total: {totalPrice}</h3>
          <button>Pagar</button>
          </>
        : null}
    </div> 
  )
}

export default Shopcart