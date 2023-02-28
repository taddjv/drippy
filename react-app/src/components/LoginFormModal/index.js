import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import shoeImage from "../../images/imageedit_2_6939284769 2.jpg";
import Logo from "../../images/Logo";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data.map((ele) => ele.slice(ele.indexOf(":") + 2)));
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="login-in-container">
        <div className="l-i-c-left">
          <img src={shoeImage} />
        </div>
        <div className="l-i-c-right">
          <div className="l-i-c-r-top">
            <Logo height="100" width="300" fill="black" />
            <h1>Welcome Back! We missed you.</h1>
          </div>
          <div className="l-i-c-r-bottom">
            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <label className="l-i-c-r-f-email" for="email">
                Email
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="l-i-c-r-f-password" for="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="l-i-c-r-f-button" type="submit">
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginFormModal;
