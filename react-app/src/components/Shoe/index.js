import React, { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  capFirstLetter,
  renderStars,
  renderShoeSize,
  storeReviewRender,
  storeBrandsRender,
  reviewDataCalc,
  similarShoesCalc,
} from "../../helpers/storeHelpers";
import { useModal } from "../../context/Modal";
import ShoeReview from "./ShoeReview";
import * as shoeActions from "../../store/shoe";
import * as brandActions from "../../store/brand";
import * as reviewActions from "../../store/review";
import * as cartActions from "../../store/cart";
import * as tempActions from "../../store/tempShoe";
import { authenticate } from "../../store/session";
import "./Shoe.css";

const Shoe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { setTransNav } = useModal();

  const shoe = useSelector((state) => state.shoeReducer);
  const brands = useSelector((state) => state.brandReducer);
  const reviews = useSelector((state) => state.reviewReducer);
  const sessionUser = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cartReducer);
  const similarShoes = useSelector((state) => state.tempShoeReducer);
  const [renderShoes, setRenderShoes] = useState(false);
  const [errors, setErrors] = useState([]);
  const [reviewErrors, setReviewErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [errorClass, setErrorClass] = useState("");
  const [writeReview, setWriteReview] = useState(false);

  const [shoeSize, setShoeSize] = useState("");
  const [editTheShoe, setEditTheShoe] = useState(false);

  const [newBrandId, setNewBrandId] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const [newReview, setNewReview] = useState("");
  const [newStars, setNewStars] = useState("");
  const [sortReviews, setSortReviews] = useState("newest");

  useEffect(() => {
    dispatch(authenticate()).then(async (res) => {
      if (await res) {
        dispatch(cartActions.getTheCart(await res.cart.id));
      }
    });
    dispatch(shoeActions.getTheShoe(id)).then(() => {
      setRenderShoes(true);
    });
    dispatch(reviewActions.getTheReviews(sortReviews, id));
    dispatch(brandActions.getTheBrands());
    dispatch(tempActions.getTheShoes());
    setTransNav(false);
  }, []);

  useEffect(() => {
    dispatch(reviewActions.getTheReviews(sortReviews, id)).then(
      async (res) => {}
    );
  }, [sortReviews]);
  useEffect(() => {
    if (shoeSize) {
      setErrorClass(null);
    }
  }, [shoeSize]);

  const radioChange = (e) => {
    setShoeSize(e.target.value);
  };
  const addToCart = (e) => {
    e.preventDefault();
    const data = {
      shoe_id: id,
      quantity: 1,
      shoe_size: Number(shoeSize.slice(5)),
    };

    if (shoeSize) {
      dispatch(
        cartActions.postTheCartItem(data, cart.id || sessionUser.cart.id)
      )
        .then(async (res) => {
          const data = await res;
          if (!sessionUser) {
            setErrors(["You must be signed in to order a shoe."]);
          } else {
            setShoeSize("");
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 2000);
            setErrors([]);
          }
        })
        .catch(async (res) => {
          const data = await res;
          setSuccess(false);
          setErrors(["You have already selected this shoe."]);
        });
    } else {
      setErrors(["Please pick a size"]);
      setErrorClass("option-error");
    }
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
  const addReviewDispatch = (e) => {
    e.preventDefault();
    const reviewData = {
      description: newReview,
      stars: newStars,
    };
    dispatch(reviewActions.postTheReview(reviewData, id, sessionUser)).then(
      async (res) => {
        const data = await res;
        if (!sessionUser) {
          setReviewErrors(["You must be logged in to give this shoe a review"]);
        } else if (data.errors) {
          setReviewErrors(
            data.errors.map((ele) => {
              if (ele.includes("description")) {
                return "You need a description to write a review.";
              }
              if (ele.includes("stars")) {
                return "You must give the rating some stars.";
              }
            })
          );
        } else {
          setNewReview("");
          setNewStars("");
          setReviewErrors([]);
          setSuccess2(true);
          setTimeout(() => {
            setSuccess2(false);
          }, 2000);
          setWriteReview(false);
        }
      }
    );
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
                      {renderStars(reviewDataCalc(reviews).total)} With{" "}
                      {reviewDataCalc(reviews).count} Reviews
                    </h3>
                  </div>
                  <div className="s-r-d-right">
                    <h3 className="s-r-d-r-price">${shoe.price} USD</h3>
                    {sessionUser ? (
                      sessionUser.id === shoe.user_id ? (
                        <>
                          {" "}
                          <button onClick={editShoe}>Edit</button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(reviewActions.deleteTheReview(id)).then(
                                () => {
                                  // console.log("coooo");
                                }
                              );
                            }}
                          >
                            Delete
                          </button>
                        </>
                      ) : null
                    ) : null}
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
              {renderShoeSize(shoeSize, radioChange, errorClass)}
            </div>
            <form className="s-r-form" onSubmit={addToCart}>
              {success && (
                <div className="s-r-f-success">
                  Shoe added ot cart successfully
                </div>
              )}

              <ul className="s-r-f-errors">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <button className="s-r-s-button">Add To Cart</button>
            </form>
          </div>
        </div>
      )}
      <div className="related-shoe">related shoes</div>
      <div className="review-separator">
        <h1>Reviews</h1>
      </div>
      {!writeReview && (
        <>
          {" "}
          <div className="write-review-div">
            <select
              id="s-r-s-stars"
              value={sortReviews}
              onChange={(e) => {
                setSortReviews(e.target.value);
              }}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>;
              <option value="high">Highest Rated</option>;
              <option value="low">Lowest Rated</option>;
            </select>
            <button
              onClick={() => {
                setWriteReview(true);
              }}
              className="write-review"
            >
              Write a Review
            </button>
          </div>
        </>
      )}

      <div className="shoe-bottom">
        <div className="shoe-reviews">
          {writeReview && (
            <>
              <form onSubmit={addReviewDispatch} className="s-b-addReview">
                <select
                  id="s-b-ar-stars"
                  value={newStars}
                  onChange={(e) => {
                    setNewStars(e.target.value);
                  }}
                >
                  <option value="0">Rate here</option>;
                  <option value="1">One star</option>;
                  <option value="2">Two stars</option>;
                  <option value="3">Three stars</option>;
                  <option value="4">Four stars</option>;
                  <option value="5">Five stars</option>;
                </select>
                {success2 && (
                  <div className="s-r-f-success">
                    Added the review successfully
                  </div>
                )}
                <ul className="s-r-f-errors">
                  {reviewErrors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
                <textarea
                  className="s-b-ar-review"
                  value={newReview}
                  placeholder="Write your review here !"
                  onChange={(e) => {
                    setNewReview(e.target.value);
                  }}
                ></textarea>

                <button type="submit" className="s-b-ar-button">
                  Add Review
                </button>
              </form>
            </>
          )}

          <div>
            {" "}
            {renderShoes &&
              storeReviewRender(reviews).map((ele) => {
                return (
                  <ShoeReview
                    user={ele.user}
                    stars={ele.stars}
                    dateCreated={ele.dateCreated}
                    description={ele.description}
                    id={ele.id}
                    currentUser={sessionUser}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shoe;
