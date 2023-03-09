import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserAccount from "./UserAccount";
import ContactInfo from "./ContactInfo";
import UserAddress from "./UserAddress";
import UserPayment from "./UserPayment";
import UserOrders from "./UserOrders";
import { useModal } from "../../context/Modal";
import "./MyAccount.css";

const MyAccount = () => {
  const { setTransNav } = useModal();
  const user = useSelector((state) => state.session.user);

  const [showAcc, setShowAcc] = useState(true);
  const [showPers, setShowPers] = useState(false);
  const [showMon, setShowMon] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showSell, setShowSell] = useState(false);

  useEffect(() => {
    setTransNav(false);
  }, []);

  return (
    <>
      {user && (
        <>
          <div className="myAccount">
            <h1 className="m-a-title"> My Account</h1>
            <div className="MAContainer">
              <div className="MAContainer-left">
                <div
                  className={showAcc ? "ma-link-select" : "ma-link"}
                  onClick={() => {
                    setShowAcc(true);
                    setShowPers(false);
                    setShowMon(false);
                    setShowOrders(false);
                    setShowSell(false);
                  }}
                >
                  Account Info
                </div>{" "}
                <div
                  className={showPers ? "ma-link-select" : "ma-link"}
                  onClick={() => {
                    setShowAcc(false);
                    setShowPers(true);
                    setShowMon(false);
                    setShowOrders(false);
                    setShowSell(false);
                  }}
                >
                  Personal Info
                </div>
                <div
                  className={showMon ? "ma-link-select" : "ma-link"}
                  onClick={() => {
                    setShowAcc(false);
                    setShowPers(false);
                    setShowMon(true);
                    setShowOrders(false);
                    setShowSell(false);
                  }}
                >
                  Monetary Info
                </div>{" "}
                {/* <div
                  className={showOrders ? "ma-link-select" : "ma-link"}
                  onClick={() => {
                    setShowAcc(false);
                    setShowPers(false);
                    setShowMon(false);
                    setShowOrders(true);
                    setShowSell(false);
                  }}
                >
                  Orders
                </div> */}
                {/* <div>Sell Your Shoe</div> */}
              </div>
              <div className="MAContainer-right">
                {" "}
                {showAcc && (
                  <div className="myAccountContainer">
                    <div className="myInfo-container">
                      <UserAccount user={user} />
                    </div>

                    <div className="myInfoEmpty"></div>
                  </div>
                )}
                {showPers && (
                  <div className="myCredentials">
                    <ContactInfo user={user} />
                    <UserAddress user={user} />
                  </div>
                )}
                {showMon && (
                  <div className="myPaymentContainer">
                    <div className="myPayment-container">
                      <UserPayment user={user} />
                    </div>

                    <div className="myInfoEmpty"></div>
                  </div>
                )}
                {/* {showOrders && <UserOrders user={user} />} */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyAccount;
