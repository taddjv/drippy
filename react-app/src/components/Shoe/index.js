import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  capFirstLetter,
  renderStars,
  renderShoeSize,
  storeReviewRender,
} from "../../helpers/storeHelpers";
import * as shoeActions from "../../store/shoe";
import * as brandActions from "../../store/brand";
import * as reviewActions from "../../store/review";
import "./Shoe.css";

const Shoe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const shoe = useSelector((state) => state.shoeReducer);
  const brand = useSelector((state) => state.brandReducer);
  const reviews = useSelector((state) => state.reviewReducer);

  const [renderShoes, setRenderShoes] = useState(false);
  const [shoeBrands, setShoeBrands] = useState(false);

  const [shoeSize, setShoeSize] = useState("");

  useEffect(() => {
    dispatch(shoeActions.getTheShoe(id)).then(() => {
      setShoeBrands(true);
    });
    dispatch(reviewActions.getTheReviews(null, null, id));
  }, []);
  useEffect(() => {
    if (shoe.brand_id) {
      dispatch(brandActions.getTheBrand(shoe.brand_id)).then(() => {
        setRenderShoes(true);
      });
    }
  }, [shoeBrands]);

  const radioChange = (e) => {
    setShoeSize(e.target.value);
  };
  const addToCart = (e) => {
    e.preventDefault();
  };

  return (
    <div className="shoe">
      {renderShoes && (
        <div className="shoe-container">
          <div className="shoe-left">
            <img className="shoe-left-picture" src={shoe.url} />
          </div>
          <div className="shoe-right">
            <div className="s-r-desc">
              <div className="s-r-d-left">
                <h3 className="s-r-d-l-brand">
                  From
                  <NavLink
                    className="s-r-d-l-b-name"
                    exact
                    to={`/brands/${brand.id}`}
                  >
                    {" " + capFirstLetter(brand.name) + " "}
                  </NavLink>
                  <img className="s-r-d-l-b-logo" src={brand.url} />
                </h3>
                <h3 className="s-r-d-l-name">{shoe.name}</h3>
                <h3 className="s-r-d-l-reviews">
                  {renderStars(shoe.reviews.total_stars)} With{" "}
                  {shoe.review_count} Reviews
                </h3>
              </div>
              <div className="s-r-d-right">
                <h3 className="s-r-d-r-price">${shoe.price} USD</h3>
              </div>
            </div>
            <div className="s-r-size">
              {renderShoeSize(shoeSize, radioChange)}
            </div>
            <form className="s-r-form" onSubmit={addToCart}>
              {" "}
              <button className="s-r-s-button">Add To Cart</button>
            </form>
          </div>
        </div>
      )}

      <div className="related-shoe"></div>
      <div className="shoe-reviews">
        {/* {renderShoes && {
            storeReviewRender.map
        }} */}
      </div>
    </div>
  );
};

export default Shoe;
