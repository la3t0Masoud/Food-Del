import React, { useContext, useMemo, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { validateCode, redeemCode } from "../../utils/discountManager";

const Cart = ({ savedPrices = {} }) => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0); // درصد تخفیف
  const [promoMsg, setPromoMsg] = useState("");
  // const discountAmount = (subtotal * discount) / 100;
  // const total = subtotal + deliveryFee + charityMatchAmount - discountAmount;
  // و discountAmount رو به return اضافه کن
  const handleApplyPromo = () => {
    const percent = validateCode(promoCode.trim().toUpperCase());
    if (percent !== null) {
      setDiscount(percent);
      redeemCode(promoCode.trim().toUpperCase());
      setPromoMsg(`✅ ${percent}% discount applied!`);
    } else {
      setPromoMsg("❌ Invalid or already used code.");
      setDiscount(0);
    }
  };

  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [charityOption, setCharityOption] = useState(null);
  // null | 'full' | 'match'

  const getItemPrice = (item) => savedPrices?.[item._id] ?? item.price;

  const cartItemVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.08,
      backgroundColor: "var(--cart-item-bg)",
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const cartData = useMemo(() => {
    let subtotal = 0;
    let itemCount = 0;
    const items = [];

    food_list.forEach((item) => {
      const quantity = cartItems[item._id];
      if (quantity > 0) {
        const price = getItemPrice(item);
        const total = price * quantity;
        subtotal += total;
        itemCount += quantity;
        items.push({ ...item, quantity, price, total });
      }
    });

    // گزینه اول: delivery fee صفر میشه
    // گزینه دوم: delivery fee معمولی + یه بار دیگه قیمت غذاها
    const deliveryFee =
      charityOption === "full" ? 0
      : subtotal > 0 ? subtotal * 0.1
      : 0;

    const charityMatchAmount =
      charityOption === "match" && subtotal > 0 ? subtotal : 0;

    const total = subtotal + deliveryFee + charityMatchAmount; // این خط همینجا بمونه
    // discountAmount رو اینجا حساب نکن چون discount یه state خارجیه

    return {
      items,
      subtotal,
      deliveryFee,
      charityMatchAmount,
      total,
      itemCount,
    };
  }, [food_list, cartItems, savedPrices, charityOption]);

  // بعد از useMemo:
  const discountAmount = (cartData.total * discount) / 100;
  const finalTotal = cartData.total - discountAmount;

  const isEmpty = cartData.items.length === 0;

  const handleCharityToggle = (option) => {
    setCharityOption((prev) => (prev === option ? null : option));
  };

  const handleCheckout = () => {
    navigate("/order", {
      state: {
        charityOption,
        subtotal: cartData.subtotal,
        deliveryFee: cartData.deliveryFee,
        charityMatchAmount: cartData.charityMatchAmount,
        total: cartData.total,
      },
    });
  };

  return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-items-header">
            <span className="cart-header-item">Item</span>
            <span className="cart-header-title">Title</span>
            <span className="cart-header-price">Price</span>
            <span className="cart-header-quantity">Quantity</span>
            <span className="cart-header-total">Total</span>
            <span className="cart-header-remove">Remove</span>
          </div>

          {isEmpty ?
            <div className="cart-empty">
              <div className="cart-empty-content">
                <svg
                  className="cart-empty-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart to get started</p>
                <button
                  className="cart-empty-button"
                  onClick={() => navigate("/")}>
                  Browse Products
                </button>
              </div>
            </div>
          : <div className="cart-items-list">
              {cartData.items.map((item) => (
                <motion.div
                  key={item._id}
                  className="cart-item"
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  whileHover="hover"
                  whileTap="tap">
                  <div className="cart-item-image">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      variants={cartItemVariants}
                    />
                  </div>
                  <div className="cart-item-title">
                    <h4>{item.name}</h4>
                    {item.description && (
                      <p className="cart-item-description">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="cart-item-price">
                    ${item.price.toFixed(0)}
                  </div>
                  <div className="cart-item-quantity">
                    <span className="quantity-badge">{item.quantity}</span>
                  </div>
                  <div className="cart-item-total">
                    ${item.total.toFixed(0)}
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item._id)}
                    aria-label={`Remove ${item.name}`}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor">
                      <path
                        d="M15 5L5 15M5 5l10 10"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>
          }
        </div>

        {!isEmpty && (
          <div className="cart-bottom">
            <motion.div
              className="cart-promocode-wrapper"
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              {/* Charity Section */}
              <div className="cart-charity">
                <div className="cart-charity-header">
                  <svg
                    className="cart-charity-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <div>
                    <h3>Give Back</h3>
                    <p>Support those in need with your order</p>
                  </div>
                </div>

                <div className="cart-charity-options">
                  <button
                    type="button"
                    className={`cart-charity-option ${charityOption === "full" ? "active" : ""}`}
                    onClick={() => handleCharityToggle("full")}
                    aria-pressed={charityOption === "full"}>
                    <div className="cart-charity-option-check">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor">
                        <path
                          d="M2 7l4 4 6-6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="cart-charity-option-content">
                      <span className="cart-charity-option-title">
                        Donate entire order
                      </span>
                      <span className="cart-charity-option-desc">
                        All items go to those in need — no delivery fee charged
                        + you get a <strong>20% discount</strong> on your next
                        order
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`cart-charity-option ${charityOption === "match" ? "active" : ""}`}
                    onClick={() => handleCharityToggle("match")}
                    aria-pressed={charityOption === "match"}>
                    <div className="cart-charity-option-check">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor">
                        <path
                          d="M2 7l4 4 6-6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="cart-charity-option-content">
                      <span className="cart-charity-option-title">
                        Match my order for someone in need
                      </span>
                      <span className="cart-charity-option-desc">
                        We duplicate your order for a person in need — you get a{" "}
                        <strong>10% discount</strong> on your next order
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Promo Code */}
              <div className="cart-promocode">
                <h3>Have a promo code?</h3>
                <p>Enter your promo code here</p>
                <div className="cart-promocode-input">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    aria-label="Promo code"
                  />
                  <button type="button" onClick={handleApplyPromo}>
                    Apply
                  </button>
                </div>
                {promoMsg && (
                  <p style={{ fontSize: "0.85rem", marginTop: "6px" }}>
                    {promoMsg}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div
              className="cart-total-wrapper"
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}>
              <div className="cart-total">
                <h3>Cart Summary</h3>
                <div className="cart-total-content">
                  <div className="cart-total-row">
                    <span>Subtotal</span>
                    <span>${cartData.subtotal.toFixed(0)}</span>
                  </div>

                  <div className="cart-total-row">
                    <span>
                      {charityOption === "full" ?
                        "Delivery Fee (waived 🎁)"
                      : "Delivery Fee (10%)"}
                    </span>
                    <span
                      className={
                        charityOption === "full" ? "cart-fee-waived" : ""
                      }>
                      {charityOption === "full" ?
                        "$0"
                      : `$${cartData.deliveryFee.toFixed(1)}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="cart-total-row" style={{ color: "green" }}>
                      <span>Discount ({discount}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <AnimatePresence>
                    {charityOption === "match" && (
                      <motion.div
                        className="cart-total-row cart-charity-match-row"
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}>
                        <span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            style={{
                              color: "#ff6b6b",
                              marginRight: "6px",
                              verticalAlign: "middle",
                            }}>
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          Charity Match
                        </span>
                        <span>${cartData.charityMatchAmount.toFixed(0)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="cart-total-divider"></div>
                  <div className="cart-total-row cart-total-final">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>{" "}
                  </div>
                </div>

                <button
                  className="cart-checkout-button"
                  onClick={handleCheckout}>
                  Proceed to Checkout
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor">
                    <path
                      d="M7 3l7 7-7 7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {charityOption && (
                    <motion.div
                      className="cart-charity-reward-hint"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.3 }}>
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
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      <span>
                        {charityOption === "full" ?
                          "You'll receive a 20% discount code after payment"
                        : "You'll receive a 10% discount code after payment"}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
