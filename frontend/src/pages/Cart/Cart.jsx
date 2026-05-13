import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = ({ savedPrices = {} }) => {
  let QuantityOfCart = 0;
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  let Price = getTotalCartAmount();
  // console.log(Price);
  const navigate = useNavigate();
  const getItemPrice = (item) => savedPrices?.[item._id] ?? item.price; // ✅

  // جمع کل با قیمت‌های آپدیت‌شده
  const getUpdatedTotal = () => {
    return food_list.reduce((total, item) => {
      if (cartItems[item._id] > 0) {
        return total + getItemPrice(item) * cartItems[item._id];
      }
      return total;
    }, 0);
  };

  const updatedTotal = getUpdatedTotal();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            QuantityOfCart += cartItems[item._id];
            const itemPrice = getItemPrice(item);

            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${itemPrice}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${itemPrice * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h4>Cart Totals</h4>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${updatedTotal}</p> {/* ← آپدیت */}
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee (10%)</p>
              <p>${updatedTotal === 0 ? 0 : updatedTotal / 10}</p>{" "}
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${updatedTotal === 0 ? 0 : updatedTotal + updatedTotal / 10}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>PROCED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
