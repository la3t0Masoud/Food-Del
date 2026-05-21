import React from "react";
import "./Header.css";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: 200 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
      <div className="header__overlay"></div>
      <div className="header__container">
        <div className="header__content">
          <h1 className="header__title">Order your favourite food here</h1>
          <p className="header__description">
            Discover a world of flavors delivered straight to your door. From
            authentic local cuisine to international favorites, every dish is
            prepared fresh by expert chefs using premium ingredients. Whether
            you're craving comfort food or exploring new tastes, we bring
            restaurant-quality meals to your table in minutes.
          </p>
          <button className="header__cta">View Menu</button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
