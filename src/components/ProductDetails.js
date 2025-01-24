// src/components/ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        style={{ maxWidth: "300px" }}
      />
      <p>{product.description}</p>
      <p>
        <strong>Price: ${product.price}</strong>
      </p>
    </div>
  );
}

export default ProductDetails;
