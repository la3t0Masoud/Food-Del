import React, { useState } from "react";
import "./DetailsPopup.css";
import { food_list } from "../../assets/assets";

const SINGLE_SELECT_KEYS = ["dough", "Cooking_Method", "Bread"];

const DetailsPopup = ({
  PDetails,
  setShowDetails,
  savedOptions,
  setSavedOptions,
  savedPrices,
  setSavedPrices,
}) => {
  const handleToggle = (key, item) => {
    const current = selectedOptions[key] || [];
    let updated;

    if (SINGLE_SELECT_KEYS.includes(key)) {
      const alreadySelected = current.find((i) => i.name === item.name);
      updated = alreadySelected ? [] : [item];
    } else {
      const exists = current.find((i) => i.name === item.name);
      updated =
        exists ?
          current.filter((i) => i.name !== item.name)
        : [...current, item];
    }

    const newOptions = { ...selectedOptions, [key]: updated };
    setSelectedOptions(newOptions);
    setSavedOptions((prev) => ({ ...prev, [PDetails._id]: newOptions }));
    setSavedPrices((prev) => ({
      ...prev,
      [PDetails._id]: calculatePrice(newOptions),
    }));
  };

  const buildDefaults = (options = {}) => {
    const defaults = {};
    Object.entries(options).forEach(([key, values]) => {
      if (SINGLE_SELECT_KEYS.includes(key)) {
        // فقط اولین آیتم رو پیشفرض انتخاب کن
        if (values.length > 0) defaults[key] = [values[0]];
      } else {
        // آیتم‌هایی که قیمت صفر دارن رو پیشفرض انتخاب کن
        const free = values.filter((i) => !i.price || i.price === 0);
        if (free.length > 0) defaults[key] = free;
      }
    });
    return defaults;
  };
  // DetailsPopup.jsx - فقط این useEffect رو اضافه کن بعد از useState

  const [selectedOptions, setSelectedOptions] = useState(
    savedOptions[PDetails._id] || buildDefaults(PDetails.options),
  );

  // اضافه کن:
  React.useEffect(() => {
    if (!savedPrices[PDetails._id]) {
      setSavedPrices((prev) => ({
        ...prev,
        [PDetails._id]: calculatePrice(selectedOptions),
      }));
    }
  }, []);

  const isSelected = (key, name) =>
    (selectedOptions[key] || []).some((i) => i.name === name);

  const calculatePrice = (opts = selectedOptions) => {
    const basePrice =
      food_list.find((f) => f._id === PDetails._id)?.price ?? PDetails.price;

    let total = basePrice;
    Object.entries(opts).forEach(([, items]) => {
      (items || []).forEach((item) => {
        total += item.price || 0;
      });
    });
    return total;
  };

  return (
    <div
      className="details-popup-overlay"
      onClick={() => setShowDetails(false)}>
      <div
        className="details-popup-container"
        onClick={(e) => e.stopPropagation()}>
        <div className="details-popup-header">
          <h2 className="details-popup-title">Product Details</h2>
        </div>

        <div className="details-popup-content">
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

          {PDetails.options && Object.keys(PDetails.options).length > 0 && (
            <div className="details-options-section">
              <h4 className="details-section-title">Customize Your Order</h4>
              {Object.entries(PDetails.options).map(([key, values]) => (
                <div key={key} className="details-option-group">
                  <label className="details-option-label">
                    {key.replace(/_/g, " ")}
                    {SINGLE_SELECT_KEYS.includes(key) && (
                      <span className="details-option-badge">Choose one</span>
                    )}
                  </label>
                  <div className="details-cards-scroll">
                    {values.map((item, index) => (
                      <button
                        key={index}
                        className={`details-ingredient-card ${isSelected(key, item.name) ? "selected" : ""}`}
                        onClick={() => handleToggle(key, item)}
                        type="button">
                        <div className="details-ingredient-img-wrapper">
                          {item.image ?
                            <img src={item.image} alt={item.name} />
                          : <div className="details-ingredient-placeholder">
                              {item.name.charAt(0).toUpperCase()}
                            </div>
                          }
                          {isSelected(key, item.name) && (
                            <div className="details-ingredient-check">✓</div>
                          )}
                        </div>
                        <span className="details-ingredient-name">
                          {item.name}
                        </span>
                        {item.price > 0 && (
                          <span className="details-ingredient-price">
                            +${item.price}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

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
