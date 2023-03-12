import React from "react";
import { renderStars } from "../../helpers/storeHelpers";

export const ShopShoe = ({ count, url, name, price, reviews }) => {
  return (
    <div className="shop-container-shoe">
      <h2 className="s-c-s-count">{count} Left in Stock</h2>
      <div className="s-c-s-image-container">
        <img className="s-c-s-image" src={url} />
      </div>

      <h2 className="s-c-s-name">{name}</h2>
      <h2 className="s-c-s-price">${price} USD</h2>
      <di className="s-c-s-bottom">
        <h2 className="s-c-s-reviews">
          {renderStars(reviews.total_stars, "s-c-s-logo")} {"("}
          {reviews.star_count}
          {")"}
        </h2>
      </di>
    </div>
  );
};
