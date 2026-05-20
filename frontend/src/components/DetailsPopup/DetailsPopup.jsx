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
    setSavedPrices((prev) => ({
      ...prev,
      [PDetails.id]: calculatePrice(updated),
    }));
  };

  const calculatePrice = (opts = selectedOptions) => {
    let total =
      savedPrices[PDetails.id] !== undefined ?
        savedPrices[PDetails.id]
      : PDetails.price || 0;

    if (savedOptions[PDetails.id]) {
      Object.entries(PDetails.options || {}).forEach(([key, values]) => {
        const previousOption = savedOptions[PDetails.id][key];
        const found = values.find((v) => v.name === previousOption);
        if (found) total -= found.price;
      });
    }

    if (PDetails.options) {
      Object.entries(PDetails.options).forEach(([key, values]) => {
        const found = values.find((v) => v.name === opts[key]);
        if (found) total += found.price;
      });
    }

    return total;
  };

  return (
    <div
      className="details-popup-overlay"
      onClick={() => setShowDetails(false)}>
      <div
        className="details-popup-container"
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="details-popup-header">
          <h2 className="details-popup-title">Product Details</h2>
          {/* <button
            className="details-popup-close"
            onClick={() => setShowDetails(false)}
            aria-label="Close">
            <img src={assets.cross_icon} alt="" />
          </button> */}
        </div>

        {/* Content */}
        <div className="details-popup-content">
          {/* Product Image & Name */}
          <div className="details-product-hero">
            <div className="details-product-image">
              <img src={PDetails.image} alt={PDetails.name} />
            </div>
            <div className="details-product-info">
              <h3 className="details-product-name">{PDetails.name}</h3>
              <p className="details-product-description">
                {PDetails.description}
              </p>
            </div>
          </div>

          {/* Options */}
          {PDetails.options && Object.keys(PDetails.options).length > 0 && (
            <div className="details-options-section">
              <h4 className="details-section-title">Customize Your Order</h4>
              <div className="details-options-grid">
                {Object.entries(PDetails.options).map(([key, values]) => (
                  <div key={key} className="details-option-group">
                    <label className="details-option-label">{key}</label>
                    <div className="details-select-wrapper">
                      <select
                        className="details-select"
                        value={selectedOptions[key] || ""}
                        onChange={(e) => handleChange(key, e.target.value)}>
                        {values.map((item, index) => (
                          <option key={index} value={item.name}>
                            {item.name}
                            {item.price > 0 ? ` (+$${item.price})` : ""}
                          </option>
                        ))}
                      </select>
                      <span className="details-select-arrow">
                        <svg
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none">
                          <path
                            d="M1 1L6 6L11 1"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="details-popup-footer">
          <div className="details-price-section">
            <span className="details-price-label">Total Price</span>
            <span className="details-price-value">
              ${calculatePrice().toFixed(2)}
            </span>
          </div>
          <button
            className="details-confirm-button"
            onClick={() => setShowDetails(false)}>
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPopup;
