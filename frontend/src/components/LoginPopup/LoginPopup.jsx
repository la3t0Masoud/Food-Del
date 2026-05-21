import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets.js";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");

  return (
    <div className="login-popup-overlay" onClick={() => setShowLogin(false)}>
      <div
        className="login-popup-container"
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="login-popup-header">
          <h2 className="login-popup-title">
            {currentState === "Login" ? "Welcome Back" : "Create Account"}
          </h2>
          <button
            className="login-popup-close"
            onClick={() => setShowLogin(false)}
            aria-label="Close">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form className="login-popup-form">
          <div className="login-popup-inputs">
            {currentState === "Sign Up" && (
              <div className="login-input-group">
                <label className="login-input-label">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="login-input"
                  required
                />
              </div>
            )}

            <div className="login-input-group">
              <label className="login-input-label">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="login-input"
                required
              />
            </div>

            <div className="login-input-group">
              <label className="login-input-label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="login-input"
                required
              />
            </div>
          </div>

          <button type="submit" className="login-submit-button">
            {currentState === "Sign Up" ? "Create Account" : "Sign In"}
          </button>

          <div className="login-popup-condition">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              By continuing, I agree to the <span>terms of use</span> &{" "}
              <span>privacy policy</span>
            </label>
          </div>

          <div className="login-popup-switch">
            {currentState === "Login" ?
              <p>
                Don't have an account?
                <span onClick={() => setCurrentState("Sign Up")}> Sign up</span>
              </p>
            : <p>
                Already have an account?
                <span onClick={() => setCurrentState("Login")}> Sign in</span>
              </p>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
