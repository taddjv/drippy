import React from "react";
import jordanBanner from "../images/jordan1banner.jpg";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./Navigation/ProfileButton";
import Logo from "../images/Logo";

const Test = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <div className="test">
        <img className="h-c-1-picture" src={jordanBanner} />{" "}
        {/* <img
        className="h-c-1-picture"
        src="https://i.pinimg.com/originals/c5/d5/33/c5d533d8720141c1c934602af69529db.jpg
      "
      />{" "}
      <img
        className="h-c-1-picture"
        src="https://i.pinimg.com/originals/c5/d5/33/c5d533d8720141c1c934602af69529db.jpg
    "
      /> */}
      </div>
    </>
  );
};

export default Test;
