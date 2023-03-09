import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import YourCart from "../Navigation/YourCart";
import {
  optionState,
  shippingErrors,
  cardErrors,
} from "../../helpers/storeHelpers";
import * as cartActions from "../../store/cart";
import "./Checkout.css";
import UserAddress from "../MyAccount/UserAddress";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCreditCard,
  faDollar,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

const Checkout = () => {
  const { setTransNav } = useModal();
  const user = useSelector((state) => state.session.user);

  const [showShipping, setShowShipping] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [payType, setPayType] = useState(null);
  const [shipErrors, setShipErrors] = useState([]);
  const [ccErrors, setCcErrors] = useState([]);

  const [state, setState] = useState(null);

  const [tempName, setTempName] = useState(null);
  const [tempCountry, setTempCountry] = useState(null);
  const [tempStreet, setTempStreet] = useState(null);
  const [tempCity, setTempCity] = useState(null);
  const [tempState, setTempState] = useState(null);
  const [tempPost, setTempPost] = useState(null);
  const [tempPhone, setTempPhone] = useState(null);

  const [tempCard, setTempCard] = useState(null);
  const [tempDate, setTempDate] = useState(null);
  const [tempSecurity, setTempSecurity] = useState(null);

  useEffect(() => {
    setTransNav(false);
    if (user) {
      if (user.address.split(",")[2] !== "*") {
        setState(user.address.split(",")[2]);
      }
    }
  }, []);

  const validateCard = (e) => {
    e.preventDefault();
    const card = tempCard || user.card.split(",")[0];
    const date = tempDate || user.card.split(",")[1];
    const security = tempSecurity || user.card.split(",")[2];
    if (payType === "creditCard") {
      if (cardErrors(card, date, security)) {
        setCcErrors(cardErrors(card, date, security));
      } else {
        setShowButton(true);
      }
    }
    if (payType === "credit") {
      setShowButton(true);
    }

    // console.log(payType);
  };

  const continueShipping = (e) => {
    e.preventDefault();
    const name =
      tempName ||
      user.contact_info.split(",")[0] + " " + user.contact_info.split(",")[1];
    const country = tempCountry || user.address.split(",")[3];
    const street = tempStreet || user.address.split(",")[0];
    const city = tempCity || user.address.split(",")[1];
    const state = tempState || user.address.split(",")[2];
    const post = tempPost || user.address.split(",")[4];
    const phone = tempPhone || user.contact_info.split(",")[2];
    if (shippingErrors(name, country, street, city, state, post, phone)) {
      setShipErrors(
        shippingErrors(name, country, street, city, state, post, phone)
      );
    } else {
      setShowShipping(false);
      setShowPayment(true);
      setShipErrors([]);
    }
  };

  return (
    <>
      {user && (
        <>
          <div className="cart">
            <div className="cart-left">
              {showShipping && (
                <>
                  <div className="cart-l-shipping">
                    <h1 className="c-l-s-title">SHIPPING INFORMATION</h1>
                    <ul className={"mp-alert"}>
                      {shipErrors.map((error, idx) => (
                        <li className={"mp-error"} key={idx}>
                          {error}
                        </li>
                      ))}
                    </ul>
                    <div className="c-l-s-container"></div>
                    <label className="c-l-s-name-label" for="name">
                      Full Name*
                    </label>
                    <input
                      defaultValue={
                        user.contact_info.split(",")[0] === "*"
                          ? null
                          : `${user.contact_info.split(",")[0]} ${
                              user.contact_info.split(",")[1]
                            }`
                      }
                      onChange={(e) => {
                        if (e.target.value) {
                          setTempName(e.target.value);
                        } else {
                          setTempName("*");
                        }
                      }}
                      value={tempName === "*" ? null : tempName}
                      name="name"
                      className="c-l-s-name"
                      type="text"
                    ></input>
                    <label className="c-l-s-name-label" for="country">
                      Country*
                    </label>
                    <select
                      defaultValue={
                        user.address.split(",")[3] === "*"
                          ? null
                          : user.address.split(",")[3]
                      }
                      onChange={(e) => {
                        if (e.target.value) {
                          setTempCountry(e.target.value);
                        } else {
                          setTempCountry("*");
                        }
                      }}
                      value={tempCountry}
                      name="country"
                      className="c-l-s-country"
                    >
                      <option></option>
                      <option value={"United States"}>United States</option>
                      <option value={"Canada"}>Canada</option>
                    </select>
                    <label className="c-l-s-name-label" for="address">
                      Street Address*
                    </label>
                    <input
                      onChange={(e) => {
                        if (e.target.value) {
                          setTempStreet(e.target.value);
                        } else {
                          setTempStreet("*");
                        }
                      }}
                      defaultValue={
                        user.address.split(",")[0] === "*"
                          ? null
                          : user.address.split(",")[0]
                      }
                      value={tempStreet === "*" ? null : tempStreet}
                      name="address"
                      className="c-l-s-address"
                      type="text"
                    ></input>
                    <label className="c-l-s-name-label" for="app">
                      Apartment, Building (optional)
                    </label>
                    <input
                      defaultValue={
                        user.address.split(",")[5] === "*"
                          ? null
                          : user.address.split(",")[5]
                      }
                      className="c-l-s-app"
                      type="text"
                      name="app"
                    ></input>
                    <label className="c-l-s-name-label" for="city">
                      City*
                    </label>
                    <input
                      onChange={(e) => {
                        if (e.target.value) {
                          setTempCity(e.target.value);
                        } else {
                          setTempCity("*");
                        }
                      }}
                      defaultValue={
                        user.address.split(",")[1] === "*"
                          ? null
                          : user.address.split(",")[1]
                      }
                      value={tempCity == "*" ? null : tempCity}
                      className="c-l-s-city"
                      type="text"
                      name="city"
                    ></input>
                    <div className="c-l-s-stateZip">
                      <div className="c-l-s-sz-left">
                        <label className="c-l-s-name-labe" for="state">
                          State/Province
                        </label>
                        <select
                          defaultValue={
                            user.address.split(",")[2] === "*"
                              ? null
                              : user.address.split(",")[2]
                          }
                          onChange={(e) => {
                            setState(e.target.value);
                            if (e.target.value) {
                              setTempState(e.target.value);
                            } else {
                              setTempState("*");
                            }
                          }}
                          value={tempState}
                          className="c-l-s-state"
                          name="state"
                        >
                          {optionState(
                            tempCountry || user.address.split(",")[3]
                          )}
                        </select>
                      </div>
                      <div className="c-l-s-sz-right">
                        <label className="c-l-s-name-labe" for="code">
                          Postal Code
                        </label>
                        <input
                          onChange={(e) => {
                            if (e.target.value) {
                              setTempPost(e.target.value);
                            } else {
                              setTempPost("*");
                            }
                          }}
                          defaultValue={
                            user.address.split(",")[4] === "*"
                              ? null
                              : user.address.split(",")[4]
                          }
                          value={tempPost == "*" ? null : tempPost}
                          className="c-l-s-code"
                          type="text"
                          name="code"
                        ></input>
                      </div>
                    </div>
                    <label className="c-l-s-name-label" for="state">
                      Phone Number
                    </label>
                    <input
                      onChange={(e) => {
                        if (e.target.value) {
                          setTempPhone(e.target.value);
                        } else {
                          setTempPhone("*");
                        }
                      }}
                      defaultValue={
                        user.contact_info.split(",")[2] === "*"
                          ? null
                          : user.contact_info.split(",")[2]
                      }
                      value={tempPhone === "*" ? null : tempPhone}
                      className="c-l-s-number"
                      type="number"
                      for="phone"
                    ></input>
                    <button
                      onClick={continueShipping}
                      className="c-l-s-button"
                      name="phone"
                    >
                      Continue to payment
                    </button>
                  </div>
                </>
              )}
              {showPayment && (
                <>
                  <div className="cart-l-payment">
                    <h1 className="c-l-s-title">PAYMENT INFORMATION</h1>
                    <ul className={"mp-alert"}>
                      {ccErrors.map((error, idx) => (
                        <li className={"mp-error"} key={idx}>
                          {error}
                        </li>
                      ))}
                    </ul>
                    <div className="c-l-card">
                      <div className="c-l-c-top">
                        <div className="c-l-c-left">
                          <input
                            onChange={(e) => {
                              setPayType(e.target.value);
                              setShowButton(false);
                              setCcErrors([]);
                            }}
                            type="radio"
                            name="payment"
                            id="card"
                            value="creditCard"
                          ></input>
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
                          onChange={(e) => {
                            if (e.target.value) {
                              setTempCard(e.target.value);
                            } else {
                              setTempCard("*");
                            }
                          }}
                          defaultValue={
                            user.card.split(",")[0] === "*"
                              ? null
                              : user.card.split(",")[0]
                          }
                          value={tempCard === "*" ? null : tempCard}
                          className="c-l-c-b-number"
                          type="number"
                          placeholder={`Credit Card Number`}
                        ></input>
                        <input
                          onChange={(e) => {
                            if (e.target.value) {
                              setTempDate(e.target.value);
                            } else {
                              setTempDate("*");
                            }
                          }}
                          defaultValue={
                            user.card.split(",")[1] === "*"
                              ? null
                              : user.card.split(",")[1]
                          }
                          value={tempDate === "*" ? null : tempDate}
                          className="c-l-c-b-date"
                          type="number"
                          placeholder={`MM/YY`}
                        ></input>
                        <input
                          onChange={(e) => {
                            if (e.target.value) {
                              setTempSecurity(e.target.value);
                            } else {
                              setTempSecurity("*");
                            }
                          }}
                          defaultValue={
                            user.card.split(",")[2] === "*"
                              ? null
                              : user.card.split(",")[2]
                          }
                          value={tempSecurity === "*" ? null : tempSecurity}
                          className="c-l-c-b-cvc"
                          type="number"
                          placeholder={`CVC`}
                        ></input>
                      </div>
                    </div>
                    <div className="c-l-credit">
                      <div className="c-l-cc-left">
                        <input
                          onChange={(e) => {
                            setPayType(e.target.value);
                            setShowButton(false);
                            setCcErrors([]);
                          }}
                          type="radio"
                          name="payment"
                          id="card"
                          value="credit"
                        ></input>
                        <label className="c-l-c-l-label" for="card">
                          Store Credit
                        </label>
                      </div>
                      <div className="c-l-cc-right">
                        {user.credit}

                        <FontAwesomeIcon
                          className={`c-l-c-r-cc`}
                          icon={faDollar}
                        />
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowShipping(true);
                        setShowPayment(false);
                      }}
                      className="c-l-c-button"
                      name="phone"
                    >
                      Go back to shipping
                    </button>
                    <button
                      onClick={validateCard}
                      className="c-l-c-button"
                      name="phone"
                    >
                      Confirm payment
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="cart-right">
              <YourCart
                checkout={true}
                state={state}
                showButton={showButton}
                payType={payType}
                credit={user.credit}
                user={user}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Checkout;
