import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

const ContactInfo = (user) => {
  const dispatch = useDispatch();

  const [newFirstName, setNewFirstName] = useState(null);
  const [newLastName, setNewLastName] = useState(null);
  const [newPhone, setNewPhone] = useState(null);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const userInfo = user.user.contact_info;

  const editUser = (e) => {
    e.preventDefault();
    const newContact = [
      newFirstName || userInfo.split(",")[0],
      newLastName || userInfo.split(",")[1],
      newPhone || userInfo.split(",")[2],
    ].join(",");
    const data = {
      username: user.user.username,
      email: user.user.email,
      contact_info: newContact,
      address: user.user.address,
      card: user.user.card,
      credit: user.user.credit,
    };
    dispatch(sessionActions.editTheUser(data, user.user.id)).then(
      async (res) => {
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
      }
    );
  };

  return (
    <div className="myContact">
      <span className="mc-title">
        {" "}
        <u>Contact Information</u>
      </span>
      {userInfo && (
        <>
          <div className="mc-success">
            {success && <> Contact information updated</>}
          </div>
          <label for="mc-first_name">First Name</label>
          <input
            defaultValue={
              userInfo.split(",")[0] === "*" ? null : userInfo.split(",")[0]
            }
            type="text"
            id="mc-first_name"
            onChange={(e) => setNewFirstName(e.target.value)}
          ></input>
          <label for="mc-last_name">Last Name</label>
          <input
            defaultValue={
              userInfo.split(",")[1] === "*" ? null : userInfo.split(",")[1]
            }
            type="text"
            id="mc-last_name"
            onChange={(e) => setNewLastName(e.target.value)}
          ></input>
          <label for="mc-phone">Phone Number</label>
          <input
            defaultValue={
              userInfo.split(",")[2] === "*" ? null : userInfo.split(",")[2]
            }
            type="text"
            id="mc-phone"
            onChange={(e) => setNewPhone(e.target.value)}
          ></input>
        </>
      )}

      <button className="mc-button" onClick={editUser}>
        Save Changes
      </button>
    </div>
  );
};

export default ContactInfo;
