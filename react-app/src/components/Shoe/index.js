import React, { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  capFirstLetter,
  renderStars,
  renderShoeSize,
  storeReviewRender,
  storeBrandsRender,
} from "../../helpers/storeHelpers";
import ShoeReview from "./ShoeReview";
import * as shoeActions from "../../store/shoe";
import * as brandActions from "../../store/brand";
import * as reviewActions from "../../store/review";
import "./Shoe.css";

const Shoe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const shoe = useSelector((state) => state.shoeReducer);
  const brands = useSelector((state) => state.brandReducer);
  const reviews = useSelector((state) => state.reviewReducer);

  const [renderShoes, setRenderShoes] = useState(false);
  const [shoeBrands, setShoeBrands] = useState(false);

  const [shoeSize, setShoeSize] = useState("");
  const [editTheShoe, setEditTheShoe] = useState(false);

  const [newBrandId, setNewBrandId] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    dispatch(shoeActions.getTheShoe(id)).then(() => {
      setRenderShoes(true);
    });
    dispatch(reviewActions.getTheReviews(null, null, id));
    dispatch(brandActions.getTheBrands());
  }, []);

  const radioChange = (e) => {
    setShoeSize(e.target.value);
  };
  const addToCart = (e) => {
    e.preventDefault();
  };
  const deleteShoe = (e) => {
    e.preventDefault();
  };

  const editShoe = (e) => {
    e.preventDefault();
    setEditTheShoe(true);
  };
  const editDispatch = (e) => {
    e.preventDefault();
    const shoeData = {
      name: newName || shoe.name,
      price: newPrice || shoe.price,
      url: newUrl || shoe.url,
      brand_id: newBrandId || shoe.brand_id,
    };
    dispatch(shoeActions.putTheShoe(id, shoeData)).then(() => {
      setEditTheShoe(false);
    });
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
              {!editTheShoe ? (
                <>
                  <div className="s-r-d-left">
                    <h3 className="s-r-d-l-brand">
                      From
                      <NavLink
                        className="s-r-d-l-b-name"
                        exact
                        to={`/brands/${shoe.brand.id}`}
                      >
                        {" " + capFirstLetter(shoe.brand.name) + " "}
                      </NavLink>
                      <img className="s-r-d-l-b-logo" src={shoe.brand.url} />
                    </h3>
                    <h3 className="s-r-d-l-name">{shoe.name}</h3>
                    <h3 className="s-r-d-l-reviews">
                      {renderStars(shoe.reviews.total_stars)} With{" "}
                      {shoe.review_count} Reviews
                    </h3>
                  </div>
                  <div className="s-r-d-right">
                    <h3 className="s-r-d-r-price">${shoe.price} USD</h3>
                    <button onClick={editShoe}>Edit</button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(shoeActions.deleteTheShoe(id)).then(() => {
                          history.push("/");
                        });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="s-r-d-left">
                    <select
                      id="s-r-d-l-brand"
                      defaultValue={shoe.brand.id}
                      onChange={(e) => {
                        setNewBrandId(e.target.value);
                      }}
                    >
                      {storeBrandsRender(brands).map((ele) => {
                        return <option value={ele.id}>{ele.name}</option>;
                      })}
                    </select>
                    <input
                      type="text"
                      defaultValue={shoe.name}
                      className="s-r-d-l-name-edit"
                      onChange={(e) => {
                        setNewName(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      defaultValue={shoe.url}
                      className="s-r-d-l-reviews"
                      onChange={(e) => {
                        setNewUrl(e.target.value);
                      }}
                    />
                  </div>
                  <div className="s-r-d-right">
                    <input
                      type="number"
                      className="s-r-d-r-price"
                      defaultValue={Number(shoe.price)}
                      onChange={(e) => {
                        setNewPrice(e.target.value);
                      }}
                    ></input>
                    <button type="submit" onClick={editDispatch}>
                      Confirm
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setEditTheShoe(false);
                      }}
                    >
                      Abort Changes
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="s-r-size">
              {renderShoeSize(shoeSize, radioChange)}
            </div>
            <form className="s-r-form" onSubmit={addToCart}>
              <button className="s-r-s-button">Add To Cart</button>
            </form>
          </div>
        </div>
      )}
      <div className="shoe-bottom">
        <div className="shoe-reviews">
          {renderShoes &&
            storeReviewRender(reviews).map((ele) => {
              return (
                <ShoeReview
                  user={ele.user}
                  stars={ele.stars}
                  dateCreated={ele.dateCreated}
                  description={ele.description}
                />
              );
            })}
        </div>
        <div className="related-shoe"></div>
      </div>
    </div>
  );
};

export default Shoe;
