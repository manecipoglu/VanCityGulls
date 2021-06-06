import { useState } from "react";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";

export default function Products() {
  const [size, setSize] = useState("");

  const {
    data: products,
    loading,
    error,
  } = useFetch("products?category=bikes");

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
  if (loading) return <Spinner />;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>
        <select id="size" value={size} onChange={e => setSize(e.target.value)}>
          <option value="">All sizes</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
        {size && <h2>Found {filteredProducts.length} bikes</h2>}
      </section>
      <section id="products">{filteredProducts.map(renderProduct)} </section>
    </>
  );
}