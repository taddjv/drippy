import React from "react";
import { renderStars } from "../../helpers/storeHelpers";

const ShoeReview = ({ user, stars, dateCreated, description }) => {
  return (
    <div className="shoeReview">
      <div className="sr-left">by {user.username}</div>
      <div className="sr-right">
        <div className="sr-r-top">
          <div className="sr-r-t-left">
            {renderStars(stars, "sr-r-t-left-star")}
          </div>
          <div className="sr-r-t-right">{dateCreated}</div>
        </div>
        <div className="sr-r-bottom">{description}</div>
      </div>
    </div>
  );
};

export default ShoeReview;
