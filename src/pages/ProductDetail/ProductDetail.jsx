import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'
import Caracteristicas from './Caracteristicas';
import "./ProductDetail.scss"
import Opiniones from './Opiniones';

const ProductDetail = () => {


    const { itemId } = useParams()
    const [item, setItem] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingCart, setLoadingCart] = useState(null)
    const { cartItems, setCartItems } = useContext(CartContext)
    const [showCharacteristics, setShowCharacteristics] = useState(true)


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
    }, [itemId])

  return (
    <div className="product-detail-main">
        <div className="product-detail">
            {error ? 
            <p>Ha ocurrido un error inesperado</p>
            : null}
            {loading ? 
            <p>Loading...</p>
            :
            <>
            <div className="detail-image">
              <img src={item.imagen} alt={item.name} />
            </div>
            <div className="detail-data">
              <div className="detail-data-name_price">
                <h1>{item.name}</h1>
                <p>{item.precio}€</p>
              </div>
              <div className="product-detail-button">
                {item.stock > 0 && !loadingCart ? 
                <button onClick={() => addToCart(cartItems, item)}>Añadir al carrito</button>
                : loadingCart ?
                <button disabled>adding to cart...</button>
                : item.stock <=0 |loadingCart ?
                <p>No stock</p>
                : null}
              </div>
            </div>
            </>}
        </div>
        <div className="product-detail-footer">
          <div className="product-detail-change-buttons">
              <p onClick={() => setShowCharacteristics(true)}>Caracteristicas</p>
              <p onClick={() => setShowCharacteristics(false)}>Opiniones</p>
          </div>
          <div className="detail-footer">
              {showCharacteristics ? 
              <Caracteristicas />
              :
              <Opiniones />}
          </div>
        </div>
    </div>
  )
}

export default ProductDetail