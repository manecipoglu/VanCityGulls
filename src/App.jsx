import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import Checkout from "./Checkout";

export default function App() {
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
              element={<ProductDetail dispatch={dispatch} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} dispatch={dispatch} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} dispatch={dispatch} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
