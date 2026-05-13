import React, { useState, useEffect } from "react";
import "./DetailsPopup.css";
import { assets } from "../../assets/assets";

const DetailsPopup = ({
  PDetails,
  setShowDetails,
  savedOptions,
  setSavedOptions,
  savedPrices,
  setSavedPrices,
}) => {
  // const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState(
    savedOptions[PDetails.id] || {},
  );

  // const calculatePrice = (opts = selectedOptions) => {
  //   let total = PDetails.price || 0;
  //   if (PDetails.options) {
  //     Object.entries(PDetails.options).forEach(([key, values]) => {
  //       const found = values.find((v) => v.name === opts[key]);
  //       if (found) total += found.price;
  //     });
  //   }
  //   return total;
  // };

  const handleChange = (key, value) => {
    const updated = { ...selectedOptions, [key]: value };
    setSelectedOptions(updated);

    setSavedOptions((prev) => ({
      ...prev,
      [PDetails.id]: updated,
    }));
    setSavedPrices((prev) => ({
      ...prev,
      [PDetails.id]: calculatePrice(updated),
    }));
  };

  const calculatePrice = (opts = selectedOptions) => {
    let total = PDetails.price || 0;

    if (PDetails.options) {
      Object.entries(PDetails.options).forEach(([key, values]) => {
        const selectedName = selectedOptions[key];
        const found = values.find((v) => v.name === opts[key]);
        if (found) total += found.price;
      });
    }

    return total;
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
                      <option key={index} value={item.name}>
                        {item.name} (+${item.price})
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            <p>
              Price: <strong>${calculatePrice()}</strong>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default DetailsPopup;
