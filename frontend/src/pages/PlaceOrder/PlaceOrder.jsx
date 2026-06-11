import React, { useContext, useMemo, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

// --- Discount code generator (simple, client-side for demo) ---
import {
  generateUniqueCode,
  saveDiscountCode,
} from "../../utils/discountManager";

const PlaceOrder = () => {
  // const { getTotalCartAmount } = useContext(StoreContext);
  const location = useLocation();

  const {
    charityOption,
    subtotal = 0,
    deliveryFee = 0,
    charityMatchAmount = 0,
    total = 0,
    discount = 0,
    discountAmount = 0,
    finalTotal = 0,
  } = location.state ?? {};

  // const charityOption = location.state?.charityOption ?? null;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [discountCode, setDiscountCode] = useState(null);

  const orderSummary = { subtotal, deliveryFee, charityMatchAmount, total };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) setPhoneNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    // Generate discount code based on charity option
    let code = null;
    if (charityOption === "full") {
      code = generateUniqueCode("GIVE20");
      saveDiscountCode(code, 20);
    } else if (charityOption === "match") {
      code = generateUniqueCode("CARE10");
      saveDiscountCode(code, 10);
    }

    setDiscountCode(code);
    setOrderPlaced(true);
  };

  // ---- Post-payment success screen ----
  if (orderPlaced) {
    return (
      <div className="place-order-wrapper">
        <motion.div
          className="order-success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="order-success-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2>Order Placed Successfully!</h2>

          {charityOption === "full" && (
            <p className="order-success-charity-msg">
              🤲 Your entire order will be delivered to those in need. Thank you
              for your generosity.
            </p>
          )}
          {charityOption === "match" && (
            <p className="order-success-charity-msg">
              💛 We'll match your order and send the same food to someone in
              need.
            </p>
          )}

          {discountCode && (
            <motion.div
              className="order-discount-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}>
              <div className="order-discount-card-header">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <span>Your Reward Discount Code</span>
              </div>
              <div className="order-discount-amount">
                {charityOption === "full" ? "20%" : "10%"} OFF your next order
              </div>
              <div className="order-discount-code-box">
                <span className="order-discount-code">{discountCode}</span>
                <button
                  type="button"
                  className="order-discount-copy"
                  onClick={() => navigator.clipboard.writeText(discountCode)}
                  aria-label="Copy discount code">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor">
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      strokeWidth="2"
                    />
                    <path
                      d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
              <p className="order-discount-note">
                Save this code — it won't be shown again.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // ---- Normal checkout form ----
  return (
    <div className="place-order-wrapper">
      <motion.form
        className="place-order"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="place-order-left">
          <div className="place-order-header">
            <svg
              className="place-order-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h3 className="title">Delivery Information</h3>
            <p className="subtitle">Please enter your delivery details</p>
          </div>

          <div className="form-section">
            <div className="multi-fields">
              <div className="input-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder=""
                  required
                  aria-required="true"
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder=""
                  required
                  aria-required="true"
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder=""
                required
                aria-required="true"
              />
            </div>
            <div className="input-group">
              <label htmlFor="street">Street Address</label>
              <input
                type="text"
                id="street"
                placeholder=""
                required
                aria-required="true"
              />
            </div>
            <div className="multi-fields">
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  placeholder=""
                  required
                  aria-required="true"
                />
              </div>
              <div className="input-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  placeholder=""
                  required
                  aria-required="true"
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="phone-input-wrapper">
                <span className="phone-prefix">+98</span>
                <input
                  type="tel"
                  id="phone"
                  className="phone-input"
                  placeholder=""
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  required
                  aria-required="true"
                  pattern="[0-9]{10}"
                  title="Phone number must be exactly 10 digits"
                />
              </div>
              {phoneNumber.length > 0 && phoneNumber.length !== 10 && (
                <span className="phone-error">
                  Phone number must be 10 digits ({phoneNumber.length}/10)
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="place-order-right">
          <motion.div
            className="order-summary"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="order-summary-header">
              <svg
                className="order-summary-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3>Order Summary</h3>
            </div>

            <div className="order-summary-content">
              <div className="order-summary-row">
                <span>Subtotal</span>
                <span>${orderSummary.subtotal.toFixed(0)}</span>
              </div>
              <div className="order-summary-row">
                <span>
                  {charityOption === "full" ?
                    "Delivery Fee (waived 🎁)"
                  : "Delivery Fee (10%)"}
                </span>
                <span
                  className={
                    charityOption === "full" ? "order-fee-waived" : ""
                  }>
                  {charityOption === "full" ?
                    "$0"
                  : `$${orderSummary.deliveryFee.toFixed(1)}`}
                </span>
              </div>

              {charityOption === "match" && (
                <div className="order-summary-row order-charity-match-row">
                  <span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{
                        color: "var(--primary)",
                        marginRight: "6px",
                        verticalAlign: "middle",
                      }}>
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Charity Match
                  </span>
                  <span>${orderSummary.charityMatchAmount.toFixed(0)}</span>
                </div>
              )}

              <div className="order-summary-divider"></div>
              <div className="order-summary-row order-summary-total">
                <span>Total Amount</span>
                <span>${orderSummary.total.toFixed(1)}</span>
              </div>
            </div>

            {charityOption && (
              <div className="order-charity-badge">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                {charityOption === "full" ?
                  "You'll receive a 20% discount code after payment"
                : "You'll receive a 10% discount code after payment"}
              </div>
            )}

            <button type="submit" className="payment-button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor">
                <rect
                  x="2"
                  y="5"
                  width="20"
                  height="14"
                  rx="2"
                  strokeWidth="2"
                />
                <path d="M2 10h20" strokeWidth="2" />
              </svg>
              Proceed to Payment
            </button>

            <div className="payment-security">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Secure payment processing</span>
            </div>
          </motion.div>
        </div>
      </motion.form>
    </div>
  );
};

export default PlaceOrder;
