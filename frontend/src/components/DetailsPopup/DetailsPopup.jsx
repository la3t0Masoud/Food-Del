import React, { useState, useEffect } from "react";
import "./DetailsPopup.css";
import { assets } from "../../assets/assets";

const DetailsPopup = ({
  PDetails,
  setShowDetails,
  savedOptions,
  setSavedOptions,
}) => {
  // const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState(
    savedOptions[PDetails.id] || {},
  );

  const handleChange = (key, value) => {
    const updated = { ...selectedOptions, [key]: value };
    setSelectedOptions(updated);

    setSavedOptions((prev) => ({
      ...prev,
      [PDetails.id]: updated,
    }));
  };
  return (
    <>
      <div className="login-popup">
        <form className="login-popup-container">
          <div className="login-popup-title">
            <h4>Details</h4>
            <img
              onClick={() => setShowDetails(false)}
              src={assets.cross_icon}
              alt="close"
            />
          </div>
          <div className="login-popup-inputs">
            <img src={PDetails.image} alt={PDetails.name} />
            <h4>{PDetails.name}</h4>
            <p>{PDetails.description}</p>
            {PDetails.options &&
              Object.entries(PDetails.options).map(([key, values]) => (
                <div key={key} className="dropdown-group">
                  <label>{key}</label>
                  <select
                    value={selectedOptions[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}>
                    {values.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            <p>Price: ${PDetails.price}</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default DetailsPopup;
