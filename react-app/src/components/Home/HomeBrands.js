import React from "react";
import { renderBrandSlider } from "../../helpers/storeHelpers";

import background from "../../images/HomeBackgroundBrand.png";

const HomeBrands = ({ renderBrands, brands }) => {
  return (
    <>
      {" "}
      <div className="home-brands">
        <div className="h-b-slider hbs-1">{renderBrandSlider(brands)}</div>
        <div className="h-b-slider hbs-2">{renderBrandSlider(brands)}</div>
        <div className="h-b-slider hbs-3">{renderBrandSlider(brands)}</div>
        <div className="h-b-slider hbs-4">{renderBrandSlider(brands)}</div>
      </div>
    </>
  );
};

export default HomeBrands;
