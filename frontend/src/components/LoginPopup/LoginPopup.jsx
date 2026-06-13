import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { registerUser, loginUser } from "../../utils/userManager";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

// ─── Validation rules ────────────────────────────────────────────
const validators = {
  name: (v) => {
    // if (!v.trim()) return "Full name is required.";
    if (/^[^a-zA-Z]/.test(v)) return "Name must start with a letter.";
    if (/[^a-zA-Z\s]/.test(v))
      return "Name can only contain letters and spaces.";
    if (v.trim().length < 3) return "Name must be at least 3 characters.";
    if (v.trim().length > 14) return "Name must be at most 14 characters.";

    return null;
  },
  email: (v) => {
    // if (!v.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      return "Please enter a valid email address.";
    return null;
  },
  password: (v) => {
    // if (!v) return "Password is required.";
    if (v.length < 8) return "Password must be at least 8 characters.";
    if (!/[0-9]/.test(v)) return "Password must contain at least one number.";
    if (!/[a-zA-Z]/.test(v))
      return "Password must contain at least one letter.";
    return null;
  },
  street: (v) => {
    // if (!v.trim()) return "Street address is required.";
    if (v.trim().length < 5)
      return "Street address must be at least 5 characters.";
    return null;
  },
  city: (v) => {
    // if (!v.trim()) return "City is required.";
    if (/[^a-zA-Z\s]/.test(v))
      return "City can only contain letters and spaces.";
    if (v.trim().length < 2) return "City must be at least 2 characters.";
    return null;
  },
  state: (v) => {
    // if (!v.trim()) return "State is required.";
    if (/[^a-zA-Z\s]/.test(v))
      return "State can only contain letters and spaces.";
    if (v.trim().length < 2) return "State must be at least 2 characters.";
    return null;
  },
  phone: (v) => {
    // if (!v) return "Phone number is required.";
    if (v.length !== 10)
      return `Phone number must be exactly 10 digits (${v.length}/10).`;
    return null;
  },
};

const SIGNUP_FIELDS = [
  "name",
  "email",
  "password",
  "street",
  "city",
  "state",
  "phone",
];
const LOGIN_FIELDS = ["email", "password"];
// ─────────────────────────────────────────────────────────────────

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
    phone: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});

  // ─── handlers ────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // به محض شروع تایپ، touched بشه و real-time validate بشه
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validators[name]?.(value) ?? null;
    setFieldErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setFormData((prev) => ({ ...prev, phone: value }));
      setTouched((prev) => ({ ...prev, phone: true }));
      setFieldErrors((prev) => ({ ...prev, phone: validators.phone(value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validators[name]?.(value) ?? null;
    setFieldErrors((prev) => ({ ...prev, [name]: err }));
    // toast حذف شد — فقط border قرمز نشون میده
  };

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    const err = validators.phone(formData.phone);
    setFieldErrors((prev) => ({ ...prev, phone: err }));
    // toast حذف شد
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fields = currentState === "Sign Up" ? SIGNUP_FIELDS : LOGIN_FIELDS;

    // پیدا کردن اولین فیلد invalid
    const firstErrorField = fields.find(
      (f) => validators[f]?.(formData[f]) !== null,
    );

    if (firstErrorField) {
      const err = validators[firstErrorField](formData[firstErrorField]);

      // فقط همون فیلد رو touched کن
      setTouched((prev) => ({ ...prev, [firstErrorField]: true }));
      setFieldErrors((prev) => ({ ...prev, [firstErrorField]: err }));

      toast.error(err, { toastId: "submit-error" });

      // focus روی فیلد خطادار
      document.querySelector(`input[name="${firstErrorField}"]`)?.focus();
      return;
    }

    // بقیه کد submit...
    if (currentState === "Sign Up") {
      const result = registerUser(
        formData.name,
        formData.email,
        formData.password,
        formData.street,
        formData.city,
        formData.state,
        formData.phone,
      );
      if (!result.success) {
        toast.error(result.message, { toastId: "register-fail" });
        return;
      }
      login(result.user);
      toast.success(`Welcome, ${result.user.name.split(" ")[0]}! 🎉`);
    } else {
      const result = loginUser(formData.email, formData.password);
      if (!result.success) {
        toast.error(result.message, { toastId: "login-fail" });
        return;
      }
      login(result.user);
      toast.success(`Welcome back, ${result.user.name.split(" ")[0]}! 👋`);
    }
    setShowLogin(false);
  };

  const switchState = (state) => {
    setCurrentState(state);
    setFieldErrors({});
    setTouched({});
    setFormData({
      name: "",
      email: "",
      password: "",
      street: "",
      city: "",
      state: "",
      phone: "",
    });
  };
  // ─────────────────────────────────────────────────────────────

  const inputClass = (field) => {
    if (!touched[field]) return "login-input";
    return `login-input ${fieldErrors[field] ? "login-input--error" : "login-input--valid"}`;
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
        <form className="login-popup-form" onSubmit={handleSubmit} noValidate>
          <div className="login-popup-inputs">
            {/* Full Name */}
            {currentState === "Sign Up" && (
              <div className="login-input-group">
                <label className="login-input-label">Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className={inputClass("name")}
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {/* {touched.name && fieldErrors.name && (
                  <span className="login-field-error">{fieldErrors.name}</span>
                )} */}
              </div>
            )}

            {/* Email */}
            <div className="login-input-group">
              <label className="login-input-label">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className={inputClass("email")}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {/* {touched.email && fieldErrors.email && (
                <span className="login-field-error">{fieldErrors.email}</span>
              )} */}
            </div>

            {/* Password */}
            <div className="login-input-group">
              <label className="login-input-label">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className={inputClass("password")}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {/* {touched.password && fieldErrors.password && (
                <span className="login-field-error">
                  {fieldErrors.password}
                </span>
              )} */}
              {currentState === "Sign Up" &&
                formData.password.length > 0 &&
                !fieldErrors.password && (
                  <span className="login-field-hint">✓ Strong password</span>
                )}
            </div>

            {/* Delivery Info */}
            {currentState === "Sign Up" && (
              <>
                <div className="login-input-divider">
                  <span>Delivery Information</span>
                </div>

                {/* Street */}
                <div className="login-input-group">
                  <label className="login-input-label">Street Address</label>
                  <input
                    name="street"
                    type="text"
                    placeholder="Enter your street address"
                    className={inputClass("street")}
                    value={formData.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {/* {touched.street && fieldErrors.street && (
                    <span className="login-field-error">
                      {fieldErrors.street}
                    </span>
                  )} */}
                </div>

                {/* City + State */}
                <div className="login-multi-fields">
                  <div className="login-input-group">
                    <label className="login-input-label">City</label>
                    <input
                      name="city"
                      type="text"
                      placeholder="City"
                      className={inputClass("city")}
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {/* {touched.city && fieldErrors.city && (
                      <span className="login-field-error">
                        {fieldErrors.city}
                      </span>
                    )} */}
                  </div>
                  <div className="login-input-group">
                    <label className="login-input-label">State</label>
                    <input
                      name="state"
                      type="text"
                      placeholder="State"
                      className={inputClass("state")}
                      value={formData.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {/* {touched.state && fieldErrors.state && (
                      <span className="login-field-error">
                        {fieldErrors.state}
                      </span>
                    )} */}
                  </div>
                </div>

                {/* Phone */}
                <div className="login-input-group">
                  <label className="login-input-label">Phone Number</label>
                  <div
                    className={`login-phone-wrapper ${
                      touched.phone ?
                        fieldErrors.phone ?
                          "login-phone-wrapper--error"
                        : "login-phone-wrapper--valid"
                      : ""
                    }`}>
                    <span className="login-phone-prefix">+98</span>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="9123456789"
                      className="login-input login-phone-input"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                      required
                    />
                  </div>
                  {/* {touched.phone && fieldErrors.phone && (
                    <span className="login-field-error">
                      {fieldErrors.phone}
                    </span>
                  )} */}
                </div>
              </>
            )}
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
