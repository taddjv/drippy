import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import YourCart from "./YourCart";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {user ? (
        <>
          {/* <NavLink className="n-r-link" exact to="/my-cart"> */}
          <i className="fa fa-shopping-cart n-r-link" size="m" />
          {/* </NavLink> */}
          <OpenModalButton
            onItemClick={closeMenu}
            modalComponent={<YourCart />}
            className="n-r-link"
            button={false}
          />
          <button className="n-r-button" onClick={openMenu}>
            Hi {user.username}
          </button>
        </>
      ) : (
        <button className="n-r-button" onClick={openMenu}>
          Account
        </button>
      )}

      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <button className="n-r-b-button" onClick={handleLogout}>
              Log Out
            </button>
            <button className="n-r-b-button">Dark mode</button>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              className="n-r-b-button"
              button={true}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
              className="n-r-b-button"
              button={true}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
