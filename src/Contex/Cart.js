import { useState, useContext, createContext, useEffect } from "react";

//var to store context
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    let existCart = localStorage.getItem('cart');
    if (existCart) setCart(JSON.parse(existCart));

  }, [])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  )

}

//custom hook
const useCart = () => useContext(CartContext)

export { useCart, CartProvider };