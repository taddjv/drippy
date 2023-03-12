import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dataRender } from "../../helpers/storeHelpers";
import ProfileButton from "./ProfileButton";
import * as sessionActions from "../../store/session";
import * as brandsActions from "../../store/brand";
import Logo from "../../images/Logo";
import "./Navigation.css";

function Navigation({ isLoaded, trans }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const brands = useSelector((state) => state.brandReducer);
  const cart = useSelector((state) => state.cartReducer);

  const [showDrop, setShowDrop] = useState(false);

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login("demo@aa.io", "password"));
  };
  useEffect(() => {
    dispatch(brandsActions.getTheBrands());
  }, []);
  const dropDown = (
    <div className="n-c-b-dropdown">
      <div className="n-c-b-d-blank"></div>
      {brands && (
        <>
          {" "}
          {dataRender(brands).map((e) => {
            return (
              <div className="n-c-b-d-element">
                <NavLink
                  exact
                  to={`/shop?brand=${e.name.split(" ").join("+")}`}
                  className="n-c-b-d-e-link"
                >
                  {e.name}
                </NavLink>
              </div>
            );
          })}
        </>
      )}
    </div>
  );

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
        <div
          onMouseEnter={(e) => {
            setShowDrop(true);
          }}
          onMouseLeave={(e) => {
            setShowDrop(false);
          }}
          className="n-c-brands"
        >
          Brands
          {showDrop && dropDown}
        </div>
      </div>
      <div className="navigation-right">
        {!sessionUser && (
          <button onClick={demoLogin} className="n-r-button">
            Demo Login
          </button>
        )}

        {isLoaded && <ProfileButton cart={cart} user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
