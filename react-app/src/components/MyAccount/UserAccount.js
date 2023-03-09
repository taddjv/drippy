import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

const UserAccount = (user) => {
  const dispatch = useDispatch();

  const [editAccount, setEditAccount] = useState(false);

  const [newUsername, setNewUsername] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [errors, setErrors] = useState([]);

  const editUser = (e) => {
    e.preventDefault();
    const data = {
      username: newUsername || user.user.username,
      email: newEmail || user.user.email,
      contact_info: user.user.contact_info,
      address: user.user.address,
      card: user.user.card,
      credit: user.user.credit,
    };
    dispatch(sessionActions.editTheUser(data, user.user.id)).then(
      async (res) => {
        const data = await res;

        if (data.errors) {
          setErrors(data.errors.map((ele) => ele.slice(ele.indexOf(":") + 2)));
        } else {
          setEditAccount(false);
        }
      }
    );
  };

  return (
    <div className="myInfo">
      <div className="m-i-title">
        <u>Account Information</u>
      </div>
      {!editAccount ? (
        <>
          <div className="m-i-name">{user.user.username}</div>
          <div className="m-i-email">{user.user.email}</div>
          <button
            className="m-i-button"
            onClick={(e) => {
              e.preventDefault();
              setEditAccount(true);
            }}
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <ul className={null}>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <input
            type="text"
            defaultValue={user.user.username}
            className="m-i-name m-i-name-edit"
            onChange={(e) => setNewUsername(e.target.value)}
          ></input>
          <input
            type="text"
            defaultValue={user.user.email}
            className="m-i-email m-i-email-edit"
            onChange={(e) => setNewEmail(e.target.value)}
          ></input>
          <div className="m-i-b-container">
            <button className="m-i-button" onClick={editUser}>
              Confirm
            </button>
            <button
              className="m-i-button"
              onClick={(e) => {
                e.preventDefault();
                setEditAccount(false);
                setNewUsername(null);
                setNewEmail(null);
                setErrors([]);
              }}
            >
              Abort Changes
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserAccount;
