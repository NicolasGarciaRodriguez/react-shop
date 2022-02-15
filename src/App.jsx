import './App.scss';
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/Register/Register"
import Shopcart from "./pages/shopcart/Shopcart"
import Nav from "./components/nav/Nav"
import {Routes, Route } from "react-router-dom"
import { CartProvider } from './context/CartContext';
import { LoginProvider } from './context/LoginContext';


const App = () => {
  return (
    <div className="App">
      <LoginProvider>
      <CartProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shopcart" element={<Shopcart />} />
        </Routes>
      </CartProvider>
      </LoginProvider>
    </div>
  );
}

export default App;
