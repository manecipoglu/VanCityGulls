import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";

const products = [
  {
    id: 1,
    category: "bikes",
    image: "Mountain_Bike.jpg",
    name: "Mountaineer",
    price: 865.95,
    skus: [
      { sku: "1M", size: "M" },
      { sku: "1L", size: "L" },
    ],
    description:
      "This classy looking mile earner is a cross country mountain bike built to give you an efficient off-road ride.",
  },
  {
    id: 2,
    category: "bikes",
    image: "Cargo_Bike.jpg",
    name: "Courier",
    price: 1299.9,
    skus: [
      { sku: "2S", size: "S" },
      { sku: "2M", size: "M" },
    ],
    description:
      "This long-tail hauler is great at making you sweat while also making it worthwhile.",
  },
  {
    id: 3,
    category: "bikes",
    image: "LowStep_Bike.jpg",
    name: "Stepper",
    price: 689.95,
    skus: [
      { sku: "3S", size: "S" },
      { sku: "3M", size: "M" },
    ],
    description:
      "Ideal for anyone who’s ever been apprehensive about swinging a leg over a top tube or being able to touch their feet to the ground at the last second.",
  },
  {
    id: 4,
    category: "bikes",
    image: "Hybrid_Bike.jpg",
    name: "Explorer",
    price: 749.95,
    skus: [
      { sku: "4S", size: "S" },
      { sku: "4M", size: "M" },
      { sku: "4L", size: "L" },
    ],
    description:
      "The Explorer is fast like a road bike, sturdy like a mountain bike, and smooth like a Cadillac.",
  },
  {
    id: 5,
    category: "bikes",
    image: "E-Bike.jpg",
    name: "Electricity",
    price: 2599.95,
    skus: [
      { sku: "5M", size: "M" },
      { sku: "5L", size: "L" },
    ],
    description:
      "This shiny-red, confident-looking commuter is as fast as it looks.",
  },
];

export default function App() {
  const [size, setSize] = useState("");

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
