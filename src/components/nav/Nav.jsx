import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { LoginContext } from '../../context/LoginContext'
import "./nav.scss"

const Nav = () => {

  const { cartItems } = useContext(CartContext)
  const {userLogged, setUserLogged} = useContext(LoginContext)


  const logout = (userLogged) => {
    setUserLogged(null)
  }

  return (
    <>
      <nav>
        <div className="links">
          <ul>
            <li><Link to="/">Home</Link></li>
            {userLogged === null ?
              <li><Link to="/login">Login</Link></li> 
            :
            <li><Link to="/login" onClick={() => logout(userLogged)}>Logout</Link></li>
            }
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
        <div className="welcome-message">
        {userLogged !== null ?
        <p>Bienvenido {userLogged.name}</p>
        : null}
        </div>
        <Link to="/shopcart">
          <div className="shopcart-button">
              <p>Carrito</p>
            {cartItems.length > 0 ? 
          <>
            <p>({cartItems.length})!</p>
          </>
          : null}
          </div>
        </Link>
      </nav>
    </>
  )
}

export default Nav