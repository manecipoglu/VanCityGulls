import { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";

export default function App() {
  const [cart, setCart] = useState([]);

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
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
