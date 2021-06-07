import { createContext, useReducer, useEffect } from "react";
import cartReducer from "./cartReducer";

export const CartContext = createContext(null);

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("gullsCart")) ?? [];
} catch {
  console.error("The cart could not ve parsed into JSON.");
  initialCart = [];
}

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(
    () => localStorage.setItem("gullsCart", JSON.stringify(cart)),
    [cart]
  );

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
}
