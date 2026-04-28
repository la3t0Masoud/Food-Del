import React from "react";
import "./DetailsPopup.css";
import { assets } from "../../assets/assets";

const DetailsPopup = ({ PDetails, setShowDetails }) => {
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h4>Details</h4>
          <img
            onClick={() => setShowDetails(false)} // بستن پاپ‌آپ
            src={assets.cross_icon}
            alt="close"
          />
        </div>
        <div className="login-popup-inputs">
          <img src={PDetails.image} alt={PDetails.name} />
          <h4>{PDetails.name}</h4>
          <p>{PDetails.description}</p>
          <p>Price: ${PDetails.price}</p>
        </div>
      </form>
    </div>
  );
};

export default DetailsPopup;
