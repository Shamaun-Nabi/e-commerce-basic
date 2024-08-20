// src/pages/Shop.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    if (loading) return;
    setLoading(true);
    const response = await fetch(
      `https://fakestoreapi.com/products?limit=10&page=${page}`
    );
    const data = await response.json();

    if (data.length > 0) {
      setProducts((prevProducts) => [...prevProducts, ...data]);
      setPage((prevPage) => prevPage + 1);
    } else {
      setHasMore(false); // No more products to load
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(); // Initial fetch for the first 10 products
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading ||
        !hasMore
      ) {
        return;
      }
      fetchProducts(); // Fetch the next set of products
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div>
      <h1>All Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product,index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              width: "200px",
            }}
          >
            <h2>{product.title}</h2>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100px", height: "100px" }}
            />
            <p>Price: ${product.price}</p>
            <Link to={`/product/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
      {loading && <p>Loading more products...</p>}
      {!hasMore && <p>No more products to load.</p>}
    </div>
  );
}

export default Shop;
