import React, { useContext, useMemo, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { motion } from "framer-motion";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [phoneNumber, setPhoneNumber] = useState("");

  const orderSummary = useMemo(() => {
    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal > 0 ? subtotal * 0.1 : 0;
    const total = subtotal + deliveryFee;
    return { subtotal, deliveryFee, total };
  }, [getTotalCartAmount]);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }
    // Handle payment logic here
  };

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
                <span>Delivery Fee (10%)</span>
                <span>${orderSummary.deliveryFee.toFixed(1)}</span>
              </div>
              <div className="order-summary-divider"></div>
              <div className="order-summary-row order-summary-total">
                <span>Total Amount</span>
                <span>${orderSummary.total.toFixed(1)}</span>
              </div>
            </div>

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
