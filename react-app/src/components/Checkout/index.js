import React, { useState } from "react";

import YourCart from "../Navigation/YourCart";
import { optionState } from "../../helpers/storeHelpers";
import * as cartActions from "../../store/cart";
import "./Checkout.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCreditCard,
  faDollar,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

const Checkout = () => {
  const [showShipping, setShowShipping] = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  const [state, setState] = useState(null);
  return (
    <div className="cart">
      <div className="cart-left">
        <div className="cart-l-shipping">
          <h1 className="c-l-s-title">
            <i class="fa fa-location-arrow" aria-hidden="true"></i> Shipping
          </h1>
          {showShipping && (
            <>
              {" "}
              <label className="c-l-s-name-label" for="name">
                Full Name*
              </label>
              <input name="name" className="c-l-s-name" type="text"></input>
              <label className="c-l-s-name-label" for="country">
                Country*
              </label>
              <select name="country" className="c-l-s-country">
                <option></option>
                <option>United States</option>
                <option>Canada</option>
              </select>
              <label className="c-l-s-name-label" for="address">
                Street Address*
              </label>
              <input
                name="address"
                className="c-l-s-address"
                type="text"
              ></input>
              <label className="c-l-s-name-label" for="app">
                Apartment, Building (optional)
              </label>
              <input className="c-l-s-app" type="text" name="app"></input>
              <label className="c-l-s-name-label" for="city">
                City*
              </label>
              <input className="c-l-s-city" type="text" name="city"></input>
              <div className="c-l-s-stateZip">
                <div className="c-l-s-sz-left">
                  <label className="c-l-s-name-labe" for="state">
                    State/Province
                  </label>
                  <select
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                    className="c-l-s-state"
                    name="state"
                  >
                    {optionState()}
                  </select>
                </div>
                <div className="c-l-s-sz-right">
                  <label className="c-l-s-name-labe" for="code">
                    Postal Code
                  </label>
                  <input className="c-l-s-code" type="text" name="code"></input>
                </div>
              </div>
              <label className="c-l-s-name-label" for="state">
                Phone Number
              </label>
              <input className="c-l-s-number" type="number" for="phone"></input>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowShipping(false);
                  setShowPayment(true);
                }}
                className="c-l-s-button"
                name="phone"
              >
                Continue to payment
              </button>
            </>
          )}
        </div>
        <div className="cart-l-payment">
          <h1 className="c-l-s-title">
            <i class="fa fa-check" aria-hidden="true"></i> Payment
          </h1>
          {showPayment && (
            <>
              <div className="c-l-card">
                <div className="c-l-c-top">
                  <div className="c-l-c-left">
                    <input type="radio" name="payment" id="card"></input>
                    <label className="c-l-c-l-label" for="card">
                      Credit Card
                    </label>
                  </div>
                  <div className="c-l-c-right">
                    <FontAwesomeIcon
                      className={`c-l-c-r-cc`}
                      icon={faCreditCard}
                    />
                  </div>
                </div>

                <div className="c-l-c-bottom">
                  <input
                    className="c-l-c-b-number"
                    type="number"
                    placeholder={`Credit Card Number`}
                  ></input>
                  <input
                    className="c-l-c-b-date"
                    type="number"
                    placeholder={`MM/YY`}
                  ></input>
                  <input
                    className="c-l-c-b-cvc"
                    type="number"
                    placeholder={`CVC`}
                  ></input>
                </div>
              </div>
              <div className="c-l-credit">
                <div className="c-l-cc-left">
                  <input type="radio" name="payment" id="card"></input>
                  <label className="c-l-c-l-label" for="card">
                    Store Credit
                  </label>
                </div>
                <div className="c-l-cc-right">
                  {`66654 `}
                  <FontAwesomeIcon className={`c-l-c-r-cc`} icon={faDollar} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="cart-right">
        <YourCart checkout={true} state={state} />
      </div>
    </div>
  );
};

export default Checkout;
