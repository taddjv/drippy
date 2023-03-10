import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import * as cartActions from "./store/cart";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Shop from "./components/Shop";
import { ShopShoe } from "./components/Shop/ShopShoe";
import Shoe from "./components/Shoe";
import Checkout from "./components/Checkout";
import Test from "./components/test";
import MyAccount from "./components/MyAccount";
import { useModal } from "./context/Modal";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { transNav } = useModal();

  const currentUser = useSelector((state) => state.session);
  useEffect(() => {
    if (currentUser.user) {
      console.log(currentUser.user);
      dispatch(cartActions.getTheCart(currentUser.user.cart.id));
    }
    setIsLoaded(true);
  }, [currentUser]);

  useEffect(() => {
    dispatch(authenticate()).then(async (res) => {
      if (await res) {
        dispatch(cartActions.getTheCart(await res.cart.id));
      }

      setIsLoaded(true);
    });
  }, []);

  return (
    <>
      <Navigation isLoaded={isLoaded} trans={transNav} />
      <Switch>
        <Route path="/shoes/:id">
          <Shoe />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/myaccount">
          <MyAccount />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      {/* {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )} */}
    </>
  );
}

export default App;
