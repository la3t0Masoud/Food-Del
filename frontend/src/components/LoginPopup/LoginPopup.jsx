import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { registerUser, loginUser } from "../../utils/userManager";
import { AuthContext } from "../../context/AuthContext";

const LoginPopup = ({ setShowLogin }) => {
  const { login } = useContext(AuthContext);
  const [currentState, setCurrentState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    street: "",
    city: "",
    state: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (currentState === "Sign Up") {
      const result = registerUser(
        formData.name,
        formData.email,
        formData.password,
        formData.street,
        formData.city,
        formData.state,
      );
      if (!result.success) return setError(result.message);
      login(result.user);
    } else {
      const result = loginUser(formData.email, formData.password);
      if (!result.success) return setError(result.message);
      login(result.user);
    }
    setShowLogin(false);
  };

  const switchState = (state) => {
    setCurrentState(state);
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
      street: "",
      city: "",
      state: "",
    });
  };

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
        <form className="login-popup-form" onSubmit={handleSubmit}>
          <div className="login-popup-inputs">
            {/* ─── Sign Up only fields ─── */}
            {currentState === "Sign Up" && (
              <>
                <div className="login-input-group">
                  <label className="login-input-label">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="login-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            {/* ─── Shared fields ─── */}
            <div className="login-input-group">
              <label className="login-input-label">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="login-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-input-group">
              <label className="login-input-label">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="login-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* ─── Sign Up: delivery info ─── */}
            {currentState === "Sign Up" && (
              <>
                <div className="login-input-divider">
                  <span>Delivery Information</span>
                </div>

                <div className="login-input-group">
                  <label className="login-input-label">Street Address</label>
                  <input
                    name="street"
                    type="text"
                    placeholder="Enter your street address"
                    className="login-input"
                    value={formData.street}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="login-multi-fields">
                  <div className="login-input-group">
                    <label className="login-input-label">City</label>
                    <input
                      name="city"
                      type="text"
                      placeholder="City"
                      className="login-input"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="login-input-group">
                    <label className="login-input-label">State</label>
                    <input
                      name="state"
                      type="text"
                      placeholder="State"
                      className="login-input"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="login-error-box">
              <svg
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

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
                <span onClick={() => switchState("Sign Up")}> Sign up</span>
              </p>
            : <p>
                Already have an account?
                <span onClick={() => switchState("Login")}> Sign in</span>
              </p>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
