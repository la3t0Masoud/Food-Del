import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { motion } from "framer-motion";

const FoodDisplay = ({
  category,
  setShowDetails,
  setSelectedFood,
  setFoodDetails,
  savedPrices,
}) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}>
        <h3>Top dishes near you</h3>
      </motion.div>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}>
                <FoodItem
                  setShowDetails={setShowDetails}
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={savedPrices?.[item._id] ?? item.price}
                  image={item.image}
                  HaveDetails={item.HaveDetails}
                  Details={item.Details}
                  options={item.options}
                  setSelectedFood={setSelectedFood}
                  setFoodDetails={setFoodDetails}
                />
              </motion.div>
            );
          }
        })}
      </div>
    </div>
  );
};
export default FoodDisplay;
