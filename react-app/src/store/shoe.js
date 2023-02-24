const GET_SHOE = "shoe/GET_SHOE";
const GET_SHOES = "shoe/GET_SHOES";
const GET_TOP_SHOES = "shoe/GET_TOP_SHOES";
const POST_SHOE = "shoe/POST_SHOE";
const PUT_SHOE = "shoe/PUT_SHOE";
const DELETE_SHOE = "shoe/DELETE_SHOE";

const getShoe = (shoe) => ({
  type: GET_SHOE,
  payload: shoe,
});
const getShoes = (shoes) => ({
  type: GET_SHOES,
  payload: shoes,
});
const getTopShoes = (shoes) => ({
  type: GET_TOP_SHOES,
  payload: shoes,
});
const postShoe = (shoe) => ({
  type: POST_SHOE,
  payload: shoe,
});
const putShoe = (shoe) => ({
  type: PUT_SHOE,
  payload: shoe,
});
const deleteShoe = () => ({
  type: DELETE_SHOE,
});

//! not used yet
export const getTheShoe = (id) => async (dispatch) => {
  const response = await fetch(`/api/shoes/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(getShoe(data));
  }
};
export const getTheShoes = (sort, search) => async (dispatch) => {
  const response = await fetch(`/api/shoes/${sort}/search/${search}/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
    dispatch(getShoes(data));
    return data;
  }
};
export const getTheTopShoes = () => async (dispatch) => {
  const response = await fetch(`/api/shoes/top`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(getTopShoes(data));
  }
};
//! not used yet
export const postTheShoe = (shoeData) => async (dispatch) => {
  const { name, url, price, brand_id } = shoeData;

  const response = await fetch(`/api/shoes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name,
      price,
      url,
      brand_id,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(postShoe(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};
export const putTheShoe = (id, shoeData) => async (dispatch) => {
  const { name, url, price, brand_id } = shoeData;

  const response = await fetch(`/api/shoes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name,
      price,
      url,
      brand_id,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(putShoe(data));
    return null;
  }
};
//! not used yet
export const deleteTheShoe = (id) => async (dispatch) => {
  const response = await fetch(`/api/shoes/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteShoe());
    return data;
  }
};
const initialState = {};

export default function shoeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SHOE: {
      let newState = { ...state };
      newState = action.payload;
      return newState;
    }
    case GET_SHOES: {
      let newState = { ...state };
      newState = {};
      if (action.payload.shoes.length) {
        action.payload.shoes.forEach((ele, i) => {
          newState[i] = ele;
        });
        return newState;
      } else {
        return [];
      }
    }
    case GET_TOP_SHOES: {
      let newState = { ...state };
      newState = action.payload;
      return newState;
    }
    case PUT_SHOE: {
      let newState = { ...state };
      newState["name"] = action.payload.name;
      newState["url"] = action.payload.url;
      newState["price"] = action.payload.price;
      newState["brand_id"] = action.payload.brand_id;
      return newState;
    }

    default:
      return state;
  }
}
