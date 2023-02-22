const GET_REVIEWS = "REVIEW/GET_REVIEWS";
const POST_REVIEW = "REVIEW/POST_REVIEW";
const PUT_REVIEW = "REVIEW/PUT_REVIEW";
const DELETE_REVIEW = "REVIEW/DELETE_REVIEW";

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  payload: reviews,
});
const postReview = (review) => ({
  type: POST_REVIEW,
  payload: review,
});
const putReview = (review) => ({
  type: PUT_REVIEW,
  payload: review,
});
const deleteReview = () => ({
  type: DELETE_REVIEW,
});

export const getTheReviews = (sort, search, id) => async (dispatch) => {
  //   const response = await fetch(`/api/reviews/${sort}/search/${search}/`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  const response = await fetch(`/api/reviews/shoes/${id}`, {
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

export const postTheReview = (reviewData) => async (dispatch) => {
  const { description, stars, shoe_id } = reviewData;

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
  if (response.ok) {
    const data = await response.json();
    dispatch(postReview(data));
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
    dispatch(putReview(data));
    return data;
  }
};

export const deleteTheReview = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteReview());
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
    default:
      return state;
  }
}
