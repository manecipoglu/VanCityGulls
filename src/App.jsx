import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";

import { getProducts } from "./services/productService";

export default function App() {
  const [size, setSize] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts("bikes")
      .then(res => setProducts(res))
      .catch(err => setError(err));
  }, []);

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter(p => p.skus.find(s => s.size === size))
    : products;

  if (error) throw error;

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>
            <select
              id="size"
              value={size}
              onChange={e => setSize(e.target.value)}
            >
              <option value="">All sizes</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </section>
          {size && <h2>Found {filteredProducts.length} bikes</h2>}
          <section id="products">
            {filteredProducts.map(renderProduct)}{" "}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
