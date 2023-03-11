import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as shoeActions from "../../store/shoe";
import * as brandActions from "../../store/brand";
import "./Home.css";
import HomeShoes from "./HomeShoes";
import HomeBrands from "./HomeBrands";
const Home = () => {
  const dispatch = useDispatch();
  const { setTransNav } = useModal();
  const shoes = useSelector((state) => state.shoeReducer);
  const brands = useSelector((state) => state.brandReducer);
  console.log(shoes);

  const [renderShoes, setRenderShoes] = useState(false);
  const [renderBrands, setRenderBrands] = useState(false);

  useEffect(() => {
    dispatch(shoeActions.getTheTopShoes()).then(() => {
      setRenderShoes(true);
    });
    dispatch(brandActions.getTheBrands()).then(() => {
      setRenderBrands(true);
    });
    setTransNav(true);
  }, []);

  return (
    <div className="home">
      <HomeShoes
        renderShoes={renderShoes}
        shoe1={shoes.shoe1}
        shoe2={shoes.shoe2}
        shoe3={shoes.shoe3}
      />
      <div className="review-separator">
        <h1>Our Brands</h1>
      </div>

      <HomeBrands renderBrands={renderBrands} brands={brands} />
    </div>
  );
};

export default Home;
