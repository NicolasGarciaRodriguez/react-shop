import React, { useContext, useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { CartContext } from '../../context/CartContext'
import { LoginContext } from '../../context/LoginContext';
import axios from 'axios'
import "./shopcart.scss";



const Shopcart = () => {

  const { cartItems, setCartItems } = useContext(CartContext)
  const [totalPrice, setTotalPrice] = useState(0)
  // const [productStock, setProductStock] = useState(0)
  const {userLogged} = useContext(LoginContext)
  let itemPrices = []



  const deleteItem = (item, index) => {
    // Elimina el item
    if (item.carrito > 1) {
      item.stock += 1
      item.carrito -= 1
      setTotalPrice(totalPrice - item.precio)
      axios.put(`http://localhost:4000/products/${item.id}`, {
        ...item,
        stock: item.stock,
        carrito: item.carrito
      })
    } else {
      const cartItemsTemp = [...cartItems]
      cartItemsTemp.splice(index, 1)
      setCartItems(cartItemsTemp)
      // Elimina el precio
      itemPrices.splice(index, 1)
      // Devuelve el stock
      item.stock += 1
      item.carrito -= 1
      axios.put(`http://localhost:4000/products/${item.id}`, {
        ...item,
        stock: item.stock,
        carrito: item.carrito
      })
    }
  }



  useEffect(() => {
    setTotalPrice(itemPrices.reduce((a, b) => a + b, 0))
  }, [itemPrices])


  return (
    <div className="shopcart">
        <h1>shopcart</h1>
        <div className="shopcart-legend">
          <div className="shopcart-legend-articulo">
            <p>Articulo</p>
          </div>
          <p>Precio</p>
          <p>Unidades</p>
          <p>Total</p>
        </div>
        {cartItems.length === 0 ? 
        <p>(El carrito está vacio)</p>
      : null}
        {cartItems.map((item, index) => {
          itemPrices.push(item.precio * item.carrito)
          return (
            <div key={item.id + Math.random(100, 1000)} className="shopcart-item">
              <div className="shopcart-articulo">
                <img src={item.imagen} alt={item.name} />
                <h3>{item.name}</h3>
              </div>
              <p>{item.precio}€</p>
              <p>X{item.carrito}</p>
              <div className="item-button">
                  <button onClick={() => deleteItem(item, index)}>Remove</button>
              </div>
            </div>
          )
        })}
        {totalPrice > 0  && userLogged === null ?
        <div className="pay">
          <div className="total-price">
            <p>TOTAL</p>
            <p>{totalPrice}€</p>
          </div>
          <div className="pay-button">
            <button disabled>Pagar</button>
            <p>debes esta logeado para pagar</p>
          </div>
        </div>
          : null}
          {userLogged !== null && cartItems.length > 0 ?
          <div className="pay">
              <div className="total-price">
                <p>TOTAL</p>
                <p>{totalPrice}</p>
              </div>
              <div className="pay-button">
                  <button>Pagar</button>
              </div>
          </div>
        : null}
    </div> 
  )
}

export default Shopcart