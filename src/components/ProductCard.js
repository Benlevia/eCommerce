// src/components/ProductCardimport React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="card h-100">
      <Link to={`/product/${product.id}`}>
        {" "}
        {/* Add Link to navigate to ProductDetailsPage */}
        <img
          src={product.image}
          className="card-img-top"
          alt={product.title}
          style={{ height: "200px", objectFit: "contain" }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">${product.price}</p>
        <div className="d-flex justify-content-between align-items-center mt-auto ">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <FontAwesomeIcon
            icon={faHeart}
            size="lg"
            onClick={handleToggleWishlist}
            style={{
              color: isInWishlist ? "red" : "gray",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
