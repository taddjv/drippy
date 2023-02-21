import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as shoeActions from "../../store/shoe";
import * as brandActions from "../../store/brand";
import "./Home.css";
import HomeShoes from "./HomeShoes";
import HomeBrands from "./HomeBrands";
const Home = () => {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.shoeReducer);
  const brands = useSelector((state) => state.brandReducer);

  const [renderShoes, setRenderShoes] = useState(false);
  const [renderBrands, setRenderBrands] = useState(false);

  useEffect(() => {
    dispatch(shoeActions.getTheTopShoes()).then(() => {
      setRenderShoes(true);
    });
    dispatch(brandActions.getTheTopBrands()).then(() => {
      setRenderBrands(true);
    });
  }, []);

  return (
    <div className="home">
      <HomeShoes
        renderShoes={renderShoes}
        shoe1={shoes.shoe1}
        shoe2={shoes.shoe2}
        shoe3={shoes.shoe3}
      />

      <HomeBrands
        renderBrands={renderBrands}
        brand1={brands.brand1}
        brand2={brands.brand2}
        brand3={brands.brand3}
        brand4={brands.brand4}
      />
    </div>
  );
};

export default Home;
