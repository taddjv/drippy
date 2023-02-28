import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import shoeImage from "../../images/imageedit_5_4941360127 2.jpg";
import Logo from "../../images/Logo";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data.map((ele) => ele.slice(ele.indexOf(":") + 2)));
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <>
      <div className="login-in-container">
        <div className="l-i-c-left">
          <img src={shoeImage} />
        </div>
        <div className="l-i-c-right">
          <div className="l-i-c-r-top2">
            <Logo height="100" width="300" fill="black" />
            <h1>Create your account here !</h1>
          </div>
          <div className="l-i-c-r-bottom2">
            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <label className="l-i-c-r-f-email2" for="email2">
                Email
                <input
                  id="email2"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="l-i-c-r-f-username" for="username">
                Username
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              <label className="l-i-c-r-f-password2" for="password2">
                Password
                <input
                  id="password2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <label className="l-i-c-r-f-cpassword">
                Confirm Password
                <input
                  id="cpassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              <button className="l-i-c-r-f-button" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupFormModal;
