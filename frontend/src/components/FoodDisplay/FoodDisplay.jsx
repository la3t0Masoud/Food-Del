import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({
  category,
  setShowDetails,
  setSelectedFood,
  setFoodDetails,
}) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h3>Top dishes near you</h3>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                setShowDetails={setShowDetails}
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                HaveDetails={item.HaveDetails}
                Details={item.Details}
                setSelectedFood={setSelectedFood}
                setFoodDetails={setFoodDetails}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
export default FoodDisplay;
