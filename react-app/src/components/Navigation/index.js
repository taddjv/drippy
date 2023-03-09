import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import Logo from "../../images/Logo";
import "./Navigation.css";

function Navigation({ isLoaded, trans }) {
  const sessionUser = useSelector((state) => state.session.user);

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
        <span className="n-c-brands">Brands</span>
      </div>
      <div className="navigation-right">
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
