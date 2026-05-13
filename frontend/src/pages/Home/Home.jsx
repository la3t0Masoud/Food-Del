import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import DetailsPopup from "../../components/DetailsPopup/DetailsPopup";

const Home = ({ setShowDetails, setFoodDetails, savedPrices }) => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <hr />
      <ExploreMenu
        category={category}
        setShowDetails={setShowDetails}
        setCategory={setCategory}
      />
      <FoodDisplay
        setShowDetails={setShowDetails}
        category={category}
        setFoodDetails={setFoodDetails}
        savedPrices={savedPrices}
      />
      <AppDownload />
    </div>
  );
};

export default Home;
