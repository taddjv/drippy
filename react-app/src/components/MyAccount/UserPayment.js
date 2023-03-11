import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { cardErrors } from "../../helpers/storeHelpers";

import visa from "../../images/visaLogo.png";
import mastercard from "../../images/mastercardLogo.png";
import amex from "../../images/amexLogo.png";

const UserPayment = (user) => {
  const dispatch = useDispatch();
  const [newNumber, setNewNumber] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [newSecurity, setNewSecurity] = useState(null);

  const [redeem, setRedeem] = useState("");
  const [errors, setErrors] = useState([]);
  const [errors2, setErrors2] = useState([]);
  const [success, setSuccess] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const cardCodes = ["000000", "123456", "666666"];

  const [editCard, setEditCard] = useState(false);
  const userCard = user.user.card;
  const userCredit = user.user.credit;

  const visaLogoPic = userCard.split(",")[0][0] === "4" ? visa : null;
  const mastercardLogoPic =
    userCard.split(",")[0][0] === "5" || userCard.split(",")[0][0] === "2"
      ? mastercard
      : null;
  const amexLogoPic = userCard.split(",")[0][0] === "3" ? amex : null;

  const redeemCard = (e) => {
    e.preventDefault();
    let userCredit = user.user.credit;
    if (!cardCodes.includes(redeem)) {
      if (redeem) {
        setErrors2(["Invalid Card"]);
        setTimeout(() => {
          setErrors2([]);
        }, 1000);
        setRedeem("");
        return;
      } else {
        setErrors2(["You Must Input Your 6 Digit Code"]);
        setTimeout(() => {
          setErrors2([]);
        }, 2000);
        setRedeem("");
      }
    } else {
      userCredit += 1000;
    }
    const data = {
      username: user.user.username,
      email: user.user.email,
      contact_info: user.user.contact_info,
      address: user.user.address,
      card: user.user.card,
      credit: userCredit || user.user.credit,
    };
    dispatch(sessionActions.editTheUser(data, user.user.id)).then(
      async (res) => {
        const data = await res;

        if (data.errors) {
          setErrors(data.errors.map((ele) => ele.slice(ele.indexOf(":") + 2)));
          setSuccess(false);
        } else {
          if (redeem) {
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 1000);
          }
          setRedeem("");
          setEditCard(false);
        }
      }
    );
  };

  const putCard = (e) => {
    e.preventDefault();
    const newCard = [
      newNumber || userCard.split(",")[0],
      newDate || userCard.split(",")[1],
      newSecurity || userCard.split(",")[2],
    ].join(",");
    const data = {
      username: user.user.username,
      email: user.user.email,
      contact_info: user.user.contact_info,
      address: user.user.address,
      card: newCard,
      credit: user.user.credit,
    };
    cardErrors(newNumber, newDate, newSecurity);
    if (cardErrors(newNumber, newDate, newSecurity)) {
      setErrors(cardErrors(newNumber, newDate, newSecurity));
    } else {
      dispatch(sessionActions.editTheUser(data, user.user.id)).then(
        async (res) => {
          const data = await res;

          if (data.errors) {
            setErrors(
              data.errors.map((ele) => ele.slice(ele.indexOf(":") + 2))
            );
            setSuccess(false);
          } else {
            if (redeem) {
              setSuccess(true);
              setTimeout(() => {
                setSuccess(false);
              }, 1000);
            }
            setRedeem("");
            setEditCard(false);
          }
        }
      );
    }
  };

  return (
    <div className="myPayment">
      <div className="mp-title">
        <u>Payment Information</u>
      </div>
      <div className="mp-balance-title">Balance</div>
      <div className="mp-balance">{userCredit}$</div>
      <ul className={"mp-alert"}>
        {errors2.map((error, idx) => (
          <li className={"mp-error"} key={idx}>
            {error}
          </li>
        ))}
        <div className="mp-success">{success && <> Card Redeemed</>}</div>
      </ul>
      <div className="mp-gift-title">Redeem Gift Card</div>
      <input
        onChange={(e) => setRedeem(e.target.value)}
        type="text"
        id="mp-gift"
        value={redeem}
      ></input>
      <button onClick={redeemCard} className="mp-gift-button">
        Redeem
      </button>
      <div className="mp-cc-title">Credit Card</div>
      <ul className={"mp-alert"}>
        {errors.map((error, idx) => (
          <li className={"mp-error"} key={idx}>
            {error}
          </li>
        ))}
      </ul>

      <div className="mp-cc">
        {editCard ? (
          <>
            <div className="mp-cc-edit">
              <div className="mp-cc-e-pic">
                {mastercardLogoPic && (
                  <img className="mp-cc-l-pic" src={mastercardLogoPic} />
                )}
                {visaLogoPic && (
                  <img className="mp-cc-l-pic" src={visaLogoPic} />
                )}
                {amexLogoPic && (
                  <img className="mp-cc-l-pic" src={amexLogoPic} />
                )}
              </div>

              <div className="mp-cc-e-input">
                {" "}
                <input
                  className="c-l-c-b-number"
                  type="number"
                  defaultValue={
                    userCard.split(",")[0] === "*"
                      ? "0000000000000000"
                      : userCard.split(",")[0]
                  }
                  onChange={(e) => {
                    setNewNumber(e.target.value);
                    setErrors([]);
                  }}
                ></input>
                <input
                  className="c-l-c-b-date"
                  type="number"
                  defaultValue={
                    userCard.split(",")[1] === "*"
                      ? "0000"
                      : userCard.split(",")[1]
                  }
                  onChange={(e) => {
                    setNewDate(e.target.value);
                    setErrors([]);
                  }}
                ></input>
                <input
                  className="c-l-c-b-cvc"
                  type="number"
                  defaultValue={
                    userCard.split(",")[2] === "*"
                      ? "000"
                      : userCard.split(",")[2]
                  }
                  onChange={(e) => {
                    setNewSecurity(e.target.value);
                    setErrors([]);
                  }}
                ></input>
              </div>
            </div>
            <button onClick={putCard} className="mp-cc-d-button">
              Confirm
            </button>
            <button
              onClick={() => setEditCard(false)}
              className="mp-cc-d-button"
            >
              AbortChanges
            </button>
          </>
        ) : (
          <>
            {userCard.split(",")[0] === "*" ? (
              <>
                No card{" "}
                <button
                  onClick={() => setEditCard(true)}
                  className="mp-cc-d-button"
                >
                  Add Card
                </button>
              </>
            ) : (
              <>
                <div className="mp-cc-logo">
                  {mastercardLogoPic && (
                    <img className="mp-cc-l-pic" src={mastercardLogoPic} />
                  )}
                  {visaLogoPic && (
                    <img className="mp-cc-l-pic" src={visaLogoPic} />
                  )}
                  {amexLogoPic && (
                    <img className="mp-cc-l-pic" src={amexLogoPic} />
                  )}
                  <div className="mp-cc-l-title">
                    **** **** **** {userCard.split(",")[0].slice(12)}{" "}
                  </div>
                </div>

                <button
                  onClick={() => setEditCard(true)}
                  className="mp-cc-d-button"
                >
                  Edit
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserPayment;
