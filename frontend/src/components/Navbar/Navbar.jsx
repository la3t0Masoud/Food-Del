import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);
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

  // Handle scroll to section after navigation
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

  const handleMenuClick = (id) => {
    setMenu(id);
    setIsMobileMenuOpen(false);
  };

  const handleAnchorClick = (e, item) => {
    e.preventDefault();
    setMenu(item.id);
    setIsMobileMenuOpen(false);

    // If not on home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/" + item.href);
    } else {
      // Already on home page, just scroll
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
          <Link
            to="/SearchBar"
            className="navbar-icon-link"
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

          <Link
            to="/cart"
            className="navbar-cart-link"
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
              {getTotalCartAmount() > 0 && (
                <motion.span
                  className="navbar-cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  aria-label={`${getTotalCartAmount()} items in cart`}></motion.span>
              )}
            </div>
          </Link>

          <button
            onClick={() => setShowLogin(true)}
            className="navbar-signin-btn navbar-signin-desktop"
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

          <button
            className="navbar-hamburger"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}>
            <span
              className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}></span>
            <span
              className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}></span>
            <span
              className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}></span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Sidebar Menu */}
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

              <ul className="mobile-menu-list">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}>
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

              <motion.div
                className="mobile-menu-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}>
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
