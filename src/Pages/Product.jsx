// src/pages/Product.js
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "200px", height: "200px" }}
      />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
}

export default Product;
