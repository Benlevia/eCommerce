import React, { useState, useEffect } from "react"; // ייבוא של useState ו-useEffect
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { productId } = useParams(); // מקבלים את ה-Id של המוצר
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
          {" "}
          {/* שימוש ב-mt-4 להוספת רווח מעל */}
          <p className="pt-5 mt-5">{product.description}</p>
          <h3>${product.price}</h3>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
