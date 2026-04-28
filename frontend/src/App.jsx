import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import SerachBar from "./pages/SearchBar/SerachBar";
import DetailsPopup from "./components/DetailsPopup/DetailsPopup";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [foodDetails, setFoodDetails] = useState({});

  return (
    <>
      {showLogin ?
        <LoginPopup setShowLogin={setShowLogin} />
      : <></>}
      {showDetails ?
        <DetailsPopup PDetails={foodDetails} setShowDetails={setShowDetails} />
      : null}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setShowDetails={setShowDetails}
                setFoodDetails={setFoodDetails}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/SearchBar" element={<SerachBar />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
