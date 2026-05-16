import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import DetailsPopup from "../../components/DetailsPopup/DetailsPopup";
import { motion } from "framer-motion";

const Home = ({ setShowDetails, setFoodDetails, savedPrices }) => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}>
        <hr />
      </motion.div>
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
