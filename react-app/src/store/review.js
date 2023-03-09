const GET_REVIEWS = "REVIEW/GET_REVIEWS";
const POST_REVIEW = "REVIEW/POST_REVIEW";
const PUT_REVIEW = "REVIEW/PUT_REVIEW";
const DELETE_REVIEW = "REVIEW/DELETE_REVIEW";

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  payload: reviews,
});
const postReview = (review, username, user_id) => ({
  type: POST_REVIEW,
  payload: review,
  username: username,
  user_id: user_id,
});
const putReview = (review, id) => ({
  type: PUT_REVIEW,
  payload: review,
  id: id,
});
const deleteReview = (id) => ({
  type: DELETE_REVIEW,
  id: id,
});

export const getTheReviews = (sort, id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/shoes/${id}/sort/${sort}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
    dispatch(getReviews(data));
    return data;
  }
};

export const postTheReview =
  (reviewData, shoe_id, user) => async (dispatch) => {
    const { description, stars } = reviewData;

    const response = await fetch(`/api/reviews/shoes/${shoe_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        description,
        stars,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      dispatch(postReview(data, user.username, user.id));

      return data;
    } else {
      return data;
    }
  };

export const putTheReview = (reviewData, id) => async (dispatch) => {
  const { description, stars } = reviewData;

  const response = await fetch(`/api/reviews/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      description,
      stars,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(putReview(data, id));
    return data;
  }
};

export const deleteTheReview = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteReview(id));
    return data;
  }
};

const initialState = {};

export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS: {
      let newState = { ...state };
      newState = {};
      if (action.payload.reviews.length) {
        action.payload.reviews.forEach((ele, i) => {
          newState[i] = ele;
        });
        return newState;
      } else {
        return [];
      }
    }
    case POST_REVIEW: {
      let newState = { ...state };

      newState[action.payload.id] = action.payload;
      newState[action.payload.id]["user"] = {
        username: action.username,
        id: action.user_id,
      };
      return newState;
    }
    case PUT_REVIEW: {
      let newState = { ...state };
      let reviewIndex = Object.keys(newState).find(
        (key) => newState[key]["id"] === action.id
      );
      newState[reviewIndex]["stars"] =
        action.payload.stars || newState[reviewIndex]["stars"];
      newState[reviewIndex]["description"] =
        action.payload.description || newState[reviewIndex]["description"];
      return newState;
    }
    case DELETE_REVIEW: {
      let newState = { ...state };
      let reviewIndex = Object.keys(newState).find(
        (key) => newState[key]["id"] === action.id
      );
      delete newState[reviewIndex];
      return newState;
    }
    default:
      return state;
  }
}
