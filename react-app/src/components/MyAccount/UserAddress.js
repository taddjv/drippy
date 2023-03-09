import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { optionState } from "../../helpers/storeHelpers";

const UserAddress = ({ user, type }) => {
  const dispatch = useDispatch();

  const [newAddress, setNewAddress] = useState(null);
  const [newState, setNewState] = useState(null);
  const [newCountry, setNewCountry] = useState(null);
  const [newPostal, setNewPostal] = useState(null);
  const [newCity, setNewCity] = useState(null);
  const [newApp, setNewApp] = useState(null);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const userAddress = user.address;

  const defaultCountry =
    userAddress.split(",")[3] === "*" ? null : userAddress.split(",")[3];

  const editUser = (e) => {
    e.preventDefault();
    const newContact = [
      newAddress || userAddress.split(",")[0],
      newCity || userAddress.split(",")[1],
      newState || userAddress.split(",")[2],
      newCountry || userAddress.split(",")[3],
      newPostal || userAddress.split(",")[4],
      newApp || userAddress.split(",")[5],
    ].join(",");
    const data = {
      username: user.username,
      email: user.email,
      contact_info: user.contact_info,
      address: newContact,
      card: user.card,
      credit: user.credit,
    };
    dispatch(sessionActions.editTheUser(data, user.id)).then(async (res) => {
      const data = await res;

      if (data.errors) {
        setErrors(data.errors.map((ele) => ele.slice(ele.indexOf(":") + 2)));
        setSuccess(false);
      } else {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
      }
    });
  };

  return (
    <div className={type === "cart" ? "myAddressCart myAddress" : "myAddress"}>
      <div className="my-title">
        <u>Delivery Information</u>
      </div>
      {userAddress && (
        <>
          <div className="mc-success">
            {success && <> Delivery information updated</>}
          </div>
          <label for="ma-country">Country</label>
          <select
            onChange={(e) => setNewCountry(e.target.value)}
            id="ma-country"
            defaultValue={defaultCountry}
          >
            <option>Choose Country</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
          </select>
          <label for="ma-state">State/Province</label>
          <select
            defaultValue={
              userAddress.split(",")[2] === "*"
                ? null
                : userAddress.split(",")[2]
            }
            onChange={(e) => {
              setNewState(e.target.value);
            }}
            id="ma-state"
          >
            {optionState(newCountry || defaultCountry)}
          </select>
          <label for="ma-city">City</label>
          <input
            defaultValue={
              userAddress.split(",")[1] === "*"
                ? null
                : userAddress.split(",")[1]
            }
            onChange={(e) => {
              setNewCity(e.target.value);
            }}
            type="text"
            id="ma-city"
          ></input>
          <label for="ma-address">Street Address</label>
          <input
            defaultValue={
              userAddress.split(",")[0] === "*"
                ? null
                : userAddress.split(",")[0]
            }
            onChange={(e) => {
              setNewAddress(e.target.value);
            }}
            type="text"
            id="ma-address"
          ></input>
          <label for="ma-app">{"Apartment, building (optional)"}</label>
          <input
            defaultValue={
              userAddress.split(",")[5] === "*"
                ? null
                : userAddress.split(",")[5]
            }
            onChange={(e) => {
              setNewApp(e.target.value);
            }}
            type="text"
            id="ma-app"
          ></input>
          <label for="ma-post">Postal Code</label>
          <input
            defaultValue={
              userAddress.split(",")[4] === "*"
                ? null
                : userAddress.split(",")[4]
            }
            onChange={(e) => {
              setNewPostal(e.target.value);
            }}
            type="text"
            id="ma-post"
          ></input>
          <button className="ma-button" onClick={editUser}>
            Save Changes
          </button>
        </>
      )}
    </div>
  );
};

export default UserAddress;
