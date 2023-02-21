import React from "react";

import background from "../../images/HomeBackgroundBrand.png";

const HomeBrands = ({ renderBrands, brand1, brand2, brand3, brand4 }) => {
  return (
    <div className="section-2-container">
      <div className="s-2-c-top">Our Top Brands </div>
      {renderBrands && (
        <div className="s-2-c-bottom">
          <div className="s-2-c-b">
            <div className="s-2-c-b-hover">
              <p>Click Here to Buy {brand1.name.toUpperCase()} Shoes</p>
            </div>
            <img className="s-2-c-b-logo" src={brand1.poster_url} />
          </div>
          <div className="s-2-c-b s-2-c-b-pair">
            <div className="s-2-c-b-hover">
              <p>Click Here to Buy {brand2.name.toUpperCase()} Shoes</p>
            </div>
            <img className="s-2-c-b-logo" src={brand2.poster_url} />
          </div>
          <div className="s-2-c-b ">
            <div className="s-2-c-b-hover">
              <p>Click Here to Buy {brand3.name.toUpperCase()} Shoes</p>
            </div>
            <img className="s-2-c-b-logo" src={brand3.poster_url} />
          </div>
          <div className="s-2-c-b s-2-c-b-pair">
            <div className="s-2-c-b-hover">
              <p>Click Here to Buy {brand4.name.toUpperCase()} Shoes</p>
            </div>
            <img className="s-2-c-b-logo" src={brand4.poster_url} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeBrands;
