import React, { useRef } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import { motion } from "framer-motion";

const ExploreMenu = ({ category, setCategory, setShowDetails }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="explore-menu-section">
      <div className="explore-menu-container">
        <div className="explore-menu-header">
          <motion.h2
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="explore-menu-title">
            Explore our menu
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="explore-menu-description">
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </motion.p>
        </div>

        <div className="explore-menu-carousel-wrapper">
          {/* <button
            className="carousel-nav-button carousel-nav-left"
            onClick={() => scroll("left")}
            aria-label="Scroll left">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button> */}

          <motion.div
            ref={scrollContainerRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="explore-menu-carousel">
            {menu_list.map((item, index) => {
              const isActive = category === item.menu_name;
              return (
                <motion.div
                  variants={itemVariants}
                  key={index}
                  className={`menu-card ${isActive ? "menu-card-active" : ""}`}
                  onClick={() =>
                    setCategory((prev) =>
                      prev === item.menu_name ? "All" : item.menu_name,
                    )
                  }
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.95 }}>
                  <div className="menu-card-image-wrapper">
                    <img
                      src={item.menu_image}
                      alt={item.menu_name}
                      className="menu-card-image"
                      loading="lazy"
                    />
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="menu-card-indicator"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </div>
                  <p className="menu-card-title">{item.menu_name}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* <button
            className="carousel-nav-button carousel-nav-right"
            onClick={() => scroll("right")}
            aria-label="Scroll right">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button> */}
        </div>

        <div className="scroll-indicator">
          <span className="scroll-indicator-text">Swipe to explore</span>
          <motion.div
            className="scroll-indicator-arrow"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            →
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ExploreMenu;
