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
    setFoodDetails({ id, name, price, description, image, Details, options });
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
              <img
                className="add"
                onClick={() => addToCart(id)}
                src={assets.add_icon_white}
                alt=""
              />
            : <div className="food-item-counter">
                <img
                  className="Cimg"
                  onClick={() => removeFromCart(id)}
                  src={assets.remove_icon_red}
                  alt=""
                />
                <p>{cartItems[id]}</p>
                <img
                  className="Cimg"
                  onClick={() => addToCart(id)}
                  src={assets.add_icon_green}
                  alt=""
                />
              </div>
            }
          </div>
          <div className="food-item-info">
            <div className="food-item-name-rating">
              <p>{name}</p>
              <img src={assets.rating_starts} alt="" />
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
