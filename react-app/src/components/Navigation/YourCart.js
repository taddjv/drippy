import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import {
  dataRender,
  cartData,
  taxCalculator,
} from "../../helpers/storeHelpers";
import * as cartActions from "../../store/cart";

const YourCart = ({ checkout, code, state }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);
  const finalTotal =
    cartData(cart).total + taxCalculator(cartData(cart).total, state);
  const { showCartModal, setShowCartModal } = useModal();

  return (
    <>
      {cart && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`yourCart ${
            checkout ? "yourCartCheckout" : "yourCartModal"
          }`}
        >
          <div className={`${checkout ? "yc-top-checkout" : "yc-top"}`}>
            <h1 className="yc-title">Your Cart</h1>
            {dataRender(cart).map((ele) => (
              <div className="yc-cartItem">
                <div className="yc-ci-left">
                  <img src={ele.shoe.url} className="yc-ci-l-image" />
                </div>
                <div className="yc-ci-right">
                  <div className="yc-ci-r-top">
                    <div className="yc-ci-r-t-left">
                      <h1>{ele.shoe.name}</h1>
                      <h2>size {ele.shoe_size}</h2>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(cartActions.deleteTheCartItem(ele.id));
                      }}
                      className="yc-ci-r-t-right"
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div className="yc-ci-r-bottom">
                    <div className="yc-ci-r-b-left">${ele.shoe.price} USD</div>
                    <div className="yc-ci-r-b-right">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const data = {
                            shoe_id: ele.shoe_id,
                            shoe_size: ele.shoe_size,
                            quantity: ele.quantity - 1,
                          };
                          if (ele.quantity === 1) {
                            dispatch(cartActions.deleteTheCartItem(ele.id));
                          } else {
                            dispatch(cartActions.putTheCartItem(data, ele.id));
                          }
                        }}
                        className="yc-ci-r-b-r-minus"
                      >
                        −
                      </button>
                      <div className="yc-ci-r-b-r-number">{ele.quantity}</div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const data = {
                            shoe_id: ele.shoe_id,
                            shoe_size: ele.shoe_size,
                            quantity: ele.quantity + 1,
                          };
                          dispatch(cartActions.putTheCartItem(data, ele.id));
                        }}
                        className="yc-ci-r-b-r-plus"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="yc-bottom">
            {checkout ? (
              <>
                <div className="yc-b-top-checkout">
                  <div>
                    <div className="yc-b-t-left">Subtotal</div>
                    <div className="yc-b-t-right">
                      ${cartData(cart).total} USD
                    </div>
                  </div>
                  <div>
                    <div className="yc-b-t-left">Promo Code</div>
                    <div className="yc-b-t-right-promo">-$0 USD</div>
                  </div>
                  <div>
                    <div className="yc-b-t-left">Sales Tax</div>
                    <div className="yc-b-t-right">
                      $
                      {Math.round(
                        taxCalculator(cartData(cart).total, state) * 100
                      ) / 100}{" "}
                      USD
                    </div>
                  </div>
                  <div>
                    <div className="yc-b-t-left">Shipping</div>
                    <div className="yc-b-t-right">FREE</div>
                  </div>

                  <div>
                    <div className="yc-b-t-left">
                      <b>Total </b>
                    </div>
                    <div className="yc-b-t-right">
                      <b>${finalTotal} USD</b>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(cartActions.clearTheCart(cart.id));
                    history.push("/");
                  }}
                  className="yc-b-bottom"
                >
                  Place Order
                </button>
              </>
            ) : (
              <>
                <div className="yc-b-top">
                  <div className="yc-b-t-left">
                    <b>Subtotal </b>({cartData(cart).itemCount} items)
                  </div>
                  <div className="yc-b-t-right">
                    <b>${cartData(cart).total} USD</b>
                  </div>
                </div>
                <button
                  onClick={() => {
                    history.push("/checkout");
                    setShowCartModal(false);
                  }}
                  className="yc-b-bottom"
                >
                  Continue to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default YourCart;
