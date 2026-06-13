import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import SerachBar from "./pages/SearchBar/SerachBar";
import DetailsPopup from "./components/DetailsPopup/DetailsPopup";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import { food_list, SINGLE_SELECT_KEYS } from "./assets/assets";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [foodDetails, setFoodDetails] = useState({});
  const [savedOptions, setSavedOptions] = useState({});

  const SINGLE_SELECT_KEYS = ["dough", "Cooking_Method", "Bread"];

  const calcDefaultPrice = (item) => {
    if (!item.HaveDetails || !item.options) return item.price;
    let total = item.price;
    Object.entries(item.options).forEach(([key, values]) => {
      if (!SINGLE_SELECT_KEYS.includes(key)) {
        values
          .filter((v) => !v.price || v.price === 0)
          .forEach((v) => {
            total += v.price || 0;
          });
      }
    });
    return total;
  };

  const [savedPrices, setSavedPrices] = useState(() => {
    const defaults = {};
    food_list.forEach((item) => {
      if (item.HaveDetails) {
        defaults[item._id] = calcDefaultPrice(item);
      }
    });
    return defaults;
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
        {showDetails && (
          <DetailsPopup
            key={foodDetails._id}
            PDetails={foodDetails}
            setShowDetails={setShowDetails}
            savedOptions={savedOptions}
            setSavedOptions={setSavedOptions}
            savedPrices={savedPrices}
            setSavedPrices={setSavedPrices}
          />
        )}
        <div className="app">
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  setShowDetails={setShowDetails}
                  setFoodDetails={setFoodDetails}
                  savedPrices={savedPrices}
                />
              }
            />
            <Route path="/cart" element={<Cart savedPrices={savedPrices} />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route
              path="/SearchBar"
              element={
                <SerachBar
                  setShowDetails={setShowDetails}
                  setFoodDetails={setFoodDetails}
                  savedPrices={savedPrices}
                />
              }
            />
          </Routes>
        </div>
        <Footer />

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="scroll-to-top"
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top">
              <svg
                className="scroll-to-top-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
