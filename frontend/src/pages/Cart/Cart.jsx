// import React, { useContext, useState } from "react";
// import "./Cart.css";
// import { StoreContext } from "../../context/StoreContext";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const Cart = ({ savedPrices = {} }) => {
//   let QuantityOfCart = 0;
//   const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
//     useContext(StoreContext);
//   let Price = getTotalCartAmount();
//   // console.log(Price);
//   const navigate = useNavigate();
//   const getItemPrice = (item) => savedPrices?.[item._id] ?? item.price; // ✅

//   const getUpdatedTotal = () => {
//     return food_list.reduce((total, item) => {
//       if (cartItems[item._id] > 0) {
//         return total + getItemPrice(item) * cartItems[item._id];
//       }
//       return total;
//     }, 0);
//   };

//   const updatedTotal = getUpdatedTotal();

//   return (
//     <div className="cart">
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />
//         {food_list.map((item, index) => {
//           if (cartItems[item._id] > 0) {
//             QuantityOfCart += cartItems[item._id];
//             const itemPrice = getItemPrice(item);

//             return (
//               <div key={index}>
//                 <div className="cart-items-title cart-items-item">
//                   <img src={item.image} alt="" />
//                   <p>{item.name}</p>
//                   <p>${itemPrice}</p>
//                   <p>{cartItems[item._id]}</p>
//                   <p>${itemPrice * cartItems[item._id]}</p>
//                   <p onClick={() => removeFromCart(item._id)} className="cross">
//                     x
//                   </p>
//                 </div>
//                 <hr />
//               </div>
//             );
//           }
//         })}
//       </div>

//       <div className="cart-bottom">
//         <motion.div
//           initial={{ opacity: 0, y: 200 }}
//           transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}>
//           <div className="cart-total">
//             <h4>Cart Totals</h4>
//             <div>
//               <div className="cart-total-details">
//                 <p>Subtotal</p>
//                 <p>${updatedTotal}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <p>Delivery Fee (10%)</p>
//                 <p>${updatedTotal === 0 ? 0 : updatedTotal / 10}</p>{" "}
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <b>Total</b>
//                 <b>
//                   ${updatedTotal === 0 ? 0 : updatedTotal + updatedTotal / 10}
//                 </b>
//               </div>
//             </div>
//             <button onClick={() => navigate("/order")}>
//               PROCED TO CHECKOUT
//             </button>
//           </div>
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, y: 200 }}
//           transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}>
//           <div className="cart-promocode">
//             <div>
//               <p>If you have a promo code, Enter it here</p>
//               <div className="cart-promocode-input">
//                 <input type="text" placeholder="Promo code" />
//                 <button>Submit</button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useMemo } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = ({ savedPrices = {} }) => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const getItemPrice = (item) => savedPrices?.[item._id] ?? item.price;

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

    const deliveryFee = subtotal > 0 ? subtotal * 0.1 : 0;
    const total = subtotal + deliveryFee;

    return { items, subtotal, deliveryFee, total, itemCount };
  }, [food_list, cartItems, savedPrices]);

  const isEmpty = cartData.items.length === 0;

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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
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
                    <strong>${item.total.toFixed(0)}</strong>
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="cart-promocode">
                <h3>Have a promo code?</h3>
                <p>Enter your promo code here</p>
                <div className="cart-promocode-input">
                  <input
                    type="text"
                    placeholder="Promo code"
                    aria-label="Promo code"
                  />
                  <button type="button">Apply</button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="cart-total-wrapper"
              initial={{ opacity: 0, y: 30 }}
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
                    <span>Delivery Fee (10%)</span>
                    <span>${cartData.deliveryFee.toFixed(1)}</span>
                  </div>
                  <div className="cart-total-divider"></div>
                  <div className="cart-total-row cart-total-final">
                    <span>Total</span>
                    <span>${cartData.total.toFixed(1)}</span>
                  </div>
                </div>
                <button
                  className="cart-checkout-button"
                  onClick={() => navigate("/order")}>
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
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
