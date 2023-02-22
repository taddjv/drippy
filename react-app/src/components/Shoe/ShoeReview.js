import React from "react";

const ShoeReview = () => {
  const obj = {
    dateCreated: "Tue, 21 Feb 2023 02:38:30 GMT",
    description: "i don't like it but wtv",
    id: 3,
    shoe_id: 2,
    stars: 2,
    user_id: 2,
    user: { username: "tadddd" },
  };

  return (
    <div className="shoeReview">
      <div className="sr-left">by {obj.user.username}</div>
      <div className="sr-right"></div>
    </div>
  );
};

export default ShoeReview;
