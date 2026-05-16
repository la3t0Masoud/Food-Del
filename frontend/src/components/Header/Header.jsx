import React from "react";
import "./Header.css";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
      <div className="header">
        <div className="header-contents">
          <h2>Order your favourite food here</h2>
          <p>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise.our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <button>View Menu</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
