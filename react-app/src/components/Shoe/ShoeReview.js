import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewsActions from "../../store/review";
import { renderStars } from "../../helpers/storeHelpers";

const ShoeReview = ({
  user,
  stars,
  dateCreated,
  description,
  currentUser,
  id,
}) => {
  const dispatch = useDispatch();

  const [editReview, setEditReview] = useState(false);
  const [errors, setErrors] = useState([]);

  const [newStars, setNewStars] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const dispatchEditReview = (e) => {
    e.preventDefault();
    const reviewData = {
      description: newDescription || description,
      stars: newStars || stars,
    };

    dispatch(reviewsActions.putTheReview(reviewData, id)).then(async (res) => {
      const data = await res;

      if (data.errors) {
        setErrors(data.errors.map((ele) => ele.slice(ele.indexOf(":") + 2)));
      } else {
        setEditReview(false);
        setErrors([]);
      }
    });
  };
  return (
    <div className="shoeReview">
      <div className="sr-left">by {user.username}</div>
      {!editReview ? (
        <div className="sr-right">
          <div className="sr-r-top">
            <div className="sr-r-t-left">
              {renderStars(stars, "sr-r-t-left-star")}
            </div>
            <div className="sr-r-t-right">{dateCreated}</div>
          </div>
          <div className="sr-r-bottom">
            <div className="sr-r-b-desc">{description}</div>
            {currentUser ? (
              currentUser.id === user.id ? (
                <div className="sr-r-b-edit">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setEditReview(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(reviewsActions.deleteTheReview(id));
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : null
            ) : null}
          </div>
        </div>
      ) : (
        <div className="sr-right">
          <ul className="s-r-f-errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="sr-r-top">
            <div className="sr-r-t-left">
              <input
                type="number"
                min="1"
                max="5"
                className={null}
                defaultValue={Number(stars)}
                onChange={(e) => {
                  setNewStars(e.target.value);
                }}
              ></input>
            </div>
            <div className="sr-r-t-right">{dateCreated}</div>
          </div>
          <div className="sr-r-bottom">
            <input
              type="text"
              className="sr-r-b-desc"
              defaultValue={description}
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
            ></input>

            <form onSubmit={dispatchEditReview} className="sr-r-b-edit">
              <button type="submit">Confirm</button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEditReview(false);
                }}
              >
                Abort Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoeReview;
