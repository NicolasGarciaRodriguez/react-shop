import React from 'react'

export const CartContext = React.createContext(null)

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = React.useState([]);

    const store = {
        cartItems,
        setCartItems,
    };


    return <CartContext.Provider value={store}>{children}</CartContext.Provider>
}