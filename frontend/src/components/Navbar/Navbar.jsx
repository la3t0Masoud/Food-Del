import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "home", label: "Home", to: "/", type: "link" },
    { id: "menu", label: "Menu", href: "#explore-menu", type: "anchor" },
    {
      id: "mobile-app",
      label: "Mobile App",
      href: "#app-download",
      type: "anchor",
    },
    { id: "contact-us", label: "Contact Us", href: "#footer", type: "anchor" },
  ];

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    return () => document.body.classList.remove("mobile-menu-open");
  }, [isMobileMenuOpen]);

  const handleMenuClick = (id) => {
    setMenu(id);
    setIsMobileMenuOpen(false);
  };

  const handleAnchorClick = (e, item) => {
    e.preventDefault();
    setMenu(item.id);
    setIsMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/" + item.href);
    } else {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const hasCartItems = getTotalCartAmount() > 0;

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <Link to="/" className="navbar-logo" aria-label="Go to homepage">
          <img
            src={assets.logo}
            alt="Restaurant Logo"
            className="navbar-logo-img"
          />
        </Link>

        {/* Desktop Navigation Menu */}
        <ul className="navbar-menu" role="navigation">
          {menuItems.map((item) =>
            item.type === "link" ?
              <li key={item.id}>
                <Link
                  to={item.to}
                  onClick={() => setMenu(item.id)}
                  className={`navbar-menu-item ${menu === item.id ? "active" : ""}`}
                  aria-current={menu === item.id ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            : <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item)}
                  className={`navbar-menu-item ${menu === item.id ? "active" : ""}`}
                  aria-current={menu === item.id ? "page" : undefined}>
                  {item.label}
                </a>
              </li>,
          )}
        </ul>

        <div className="navbar-right">
          {/* Theme Toggle — desktop only */}
          <button
            onClick={toggleTheme}
            className="navbar-theme-toggle navbar-desktop-only"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}>
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}>
              {isDark ?
                <svg
                  className="navbar-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              : <svg
                  className="navbar-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              }
            </motion.div>
          </button>

          {/* Search — desktop only */}
          <Link
            to="/SearchBar"
            className="navbar-icon-link navbar-desktop-only"
            aria-label="Search">
            <svg
              className="navbar-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>

          {/* Cart — desktop only */}
          <Link
            to="/cart"
            className="navbar-cart-link navbar-desktop-only"
            aria-label="Shopping cart">
            <div className="navbar-cart-icon">
              <svg
                className="navbar-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {hasCartItems && (
                <motion.span
                  className="navbar-cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  aria-label="Items in cart"
                />
              )}
            </div>
          </Link>

          {/* Sign In — desktop only */}
          <button
            onClick={() => setShowLogin(true)}
            className="navbar-signin-btn navbar-desktop-only"
            aria-label="Sign in to your account">
            <svg
              className="navbar-signin-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Sign In
          </button>

          {/* Hamburger — mobile/tablet only */}
          <button
            className="navbar-hamburger"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}>
            {/* Badge on hamburger when cart has items */}
            {hasCartItems && !isMobileMenuOpen && (
              <motion.span
                className="hamburger-cart-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                aria-hidden="true"
              />
            )}
            <span
              className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
            />
            <span
              className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
            />
            <span
              className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="navbar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMobileMenu}
            />
            <motion.div
              className="navbar-mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}>
              {/* Header */}
              <div className="mobile-menu-header">
                <h2 className="mobile-menu-title">Menu</h2>
                <button
                  className="mobile-menu-close"
                  onClick={toggleMobileMenu}
                  aria-label="Close menu">
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

              {/* Nav Links */}
              <ul className="mobile-menu-list" role="navigation">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}>
                    {item.type === "link" ?
                      <Link
                        to={item.to}
                        onClick={() => handleMenuClick(item.id)}
                        className={`mobile-menu-item ${menu === item.id ? "active" : ""}`}>
                        {item.label}
                      </Link>
                    : <a
                        href={item.href}
                        onClick={(e) => handleAnchorClick(e, item)}
                        className={`mobile-menu-item ${menu === item.id ? "active" : ""}`}>
                        {item.label}
                      </a>
                    }
                  </motion.li>
                ))}
              </ul>

              {/* Quick Actions — Search & Cart inside menu */}
              <motion.div
                className="mobile-menu-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}>
                <Link
                  to="/SearchBar"
                  className="mobile-action-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Search">
                  <svg
                    className="mobile-action-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search
                </Link>

                <Link
                  to="/cart"
                  className="mobile-action-btn mobile-cart-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Shopping cart">
                  <div className="mobile-action-icon-wrap">
                    <svg
                      className="mobile-action-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {hasCartItems && (
                      <span className="mobile-cart-badge" aria-hidden="true" />
                    )}
                  </div>
                  Cart
                </Link>
              </motion.div>

              {/* Footer — Theme Toggle & Sign In */}
              <motion.div
                className="mobile-menu-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}>
                <button
                  onClick={toggleTheme}
                  className="mobile-theme-toggle"
                  aria-label={
                    isDark ? "Switch to light mode" : "Switch to dark mode"
                  }>
                  {isDark ?
                    <>
                      <svg
                        className="mobile-theme-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      Light Mode
                    </>
                  : <>
                      <svg
                        className="mobile-theme-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                      Dark Mode
                    </>
                  }
                </button>

                <button
                  onClick={() => {
                    setShowLogin(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-signin-btn">
                  <svg
                    className="mobile-signin-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Sign In
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
