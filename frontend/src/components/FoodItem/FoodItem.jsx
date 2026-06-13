import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import LoginPopup from "../LoginPopup/LoginPopup";
import { motion } from "framer-motion";

const FoodItem = ({
  id,
  name,
  price,
  description,
  image,
  HaveDetails,
  Details,
  options,
  setShowDetails,
  setSelectedFood,
  setFoodDetails,
}) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const handleFoodSelect = () => {
    setFoodDetails({
      _id: id,
      name,
      price,
      description,
      image,
      Details,
      options,
    });
    setShowDetails(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}>
        <div className="food-item">
          <div className="food-item-img-container">
            <img className="food-item-image" src={image} alt="" />
            {!cartItems[id] ?
              <button
                className="add-btn-custom"
                onClick={() => addToCart(id)}
                aria-label="Add to cart">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            : <div className="food-item-counter">
                <button
                  className="Cimg counter-action minus"
                  onClick={() => removeFromCart(id)}
                  aria-label="Remove one">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <span className="counter-divider" />
                <p>{cartItems[id]}</p>
                <span className="counter-divider" />
                <button
                  className="Cimg counter-action plus"
                  onClick={() => addToCart(id)}
                  aria-label="Add one more">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            }
          </div>
          <div className="food-item-info">
            <div className="food-item-name-rating">
              <p>{name}</p>
              <img className="RateImg" src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-des">{description}</p>
            <div className="DivButtoms">
              <p className="food-item-price">${price}</p>
              {HaveDetails && (
                <button onClick={handleFoodSelect} className="Details">
                  Details
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FoodItem;
