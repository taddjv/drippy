import React from "react";
import { NavLink } from "react-router-dom";

const UserOrders = (user) => {
  return (
    <div className="myOrders">
      <span className="mp-title">Orders</span>
      <div className="mp-summary">*** orders placed</div>
      <div className="mo-order">
        <div className="mo-top">
          <div className="mo-t-date">
            <p>ORDER PLACED</p>
            <p>*date*</p>
          </div>
          <div className="mo-t-total">
            <p>TOTAL</p>
            <p>*price total*</p>
          </div>
          <div className="mo-t-ship">
            <p>SHIPS TO</p>
            <p>*price total*</p>
          </div>
        </div>
        <div className="mo-middle">Shipping on *some day*</div>
        <div className="mo-bottom">
          <div className="mo-b-order">
            <div className="mo-b-order-picture"></div>
            <div className="mo-b-order-title">
              <NavLink exact to="/shoelink"></NavLink>
            </div>
          </div>
          <button className="mo-b-button">Cancel Order</button>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
