// src/components/ProductDetailsPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux"; // ייבוא useDispatch
import { addToCart } from "../redux/cartSlice"; // ייבוא addToCart

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(); // הגדרת ה-dispatch

  useEffect(() => {
    // טוענים את המוצר על פי ה-Id שנשלח
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // שליחת המוצר לעגלת הקניות
  };

  return (
    <div className="container my-4">
      <h1>{product.title}</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6 mt-5">
          <p className="pt-5 mt-5">{product.description}</p>
          <h3>${product.price}</h3>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
