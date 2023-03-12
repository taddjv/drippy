import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as sessionActions from "../../store/session";
import Logo from "../../images/Logo";
import "./Navigation.css";

function Navigation({ isLoaded, trans }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login("demo@aa.io", "password"));
  };

  return (
    <div className={trans ? "navigation-test" : "navigation"}>
      <div className="navigation-left">
        <NavLink exact to="/">
          <Logo height="50" width="150" fill="white" />
        </NavLink>
      </div>
      <div className="navigation-center">
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink exact to="/shop">
          Shop
        </NavLink>
        {/* <span className="n-c-brands">Brands</span> */}
      </div>
      <div className="navigation-right">
        {!sessionUser && (
          <button onClick={demoLogin} className="n-r-button">
            Demo Login
          </button>
        )}

        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
