import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import Checkout from "./Checkout";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("gullsCart")) ?? [];
    } catch {
      console.error("The cart could not ve parsed into JSON.");
      return [];
    }
  });

  useEffect(
    () => localStorage.setItem("gullsCart", JSON.stringify(cart)),
    [cart]
  );

  function addToCart(id, sku) {
    setCart(items => {
      const itemInCart = items.find(item => item.sku === sku);
      if (itemInCart) {
        return items.map(item =>
          item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart(items => {
      return quantity === 0
        ? items.filter(item => item.sku !== sku)
        : items.map(item => (item.sku === sku ? { ...item, quantity } : item));
    });
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={<h1>Welcome to VanCity Gulls Bicycle</h1>}
            />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<ProductDetail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
