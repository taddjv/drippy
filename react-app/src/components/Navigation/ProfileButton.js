import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { useModal } from "../../context/Modal";
import { dataRender } from "../../helpers/storeHelpers";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import YourCart from "./YourCart";

function ProfileButton({ user, cart }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const { showCartModal, setShowCartModal } = useModal();

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

    dispatch(logout()).then(() => {
      if (history.location.pathname === "/myaccount") {
        history.push("/");
      }
      if (history.location.pathname === "/checkout") {
        history.push("/");
      }
    });
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);
  return (
    <>
      {showCartModal && (
        <>
          <div
            onClick={() => {
              setShowCartModal(false);
            }}
            className="yourCart-background"
          >
            <YourCart checkout={false} />
          </div>
        </>
      )}
      {user ? (
        <>
          {/* {dataRender(cart).length ? (
            <div className="n-r-cartCount">{dataRender(cart).length}</div>
          ) : null} */}

          <i
            onClick={() => {
              setShowCartModal(true);
            }}
            className="fa fa-shopping-cart n-r-link"
            size="m"
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
            <button className="n-r-b-button">
              {" "}
              <NavLink className=" n-r-b-link" exact to="/myaccount">
                My Account
              </NavLink>
            </button>

            <button className="n-r-b-button" onClick={handleLogout}>
              Log Out
            </button>
            {/* <button className="n-r-b-button">Dark mode</button> */}
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
