import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FoodItem from "../../components/FoodItem/FoodItem";
import { StoreContext } from "../../context/StoreContext";
import "./SearchBar.css";

const SerachBar = ({ setShowDetails, setFoodDetails, savedPrices }) => {
  const [SearchingFood, setSearchingFood] = useState("");

  const { food_list } = useContext(StoreContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchingFood(e.target.querySelector(".search-input").value);
  };

  return (
    <>
      <div className="home">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for Food ..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
      <div className="food-display" id="food-display">
        <div className="food-display-list">
          {food_list
            .filter((item) =>
              item.name.toLowerCase().includes(SearchingFood.toLowerCase()),
            )
            .map((item, index) => (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={savedPrices[item._id] || item.price}
                image={item.image}
                HaveDetails={item.HaveDetails}
                Details={item.Details}
                options={item.options}
                setShowDetails={setShowDetails}
                setFoodDetails={setFoodDetails}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default SerachBar;
