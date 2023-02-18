import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import Logo from "../../images/Logo";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navigation">
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
        <NavLink exact to="/brands">
          Brands
        </NavLink>
      </div>
      <div className="navigation-right">
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
