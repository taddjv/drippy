import { getShoesUrl } from "../helpers/storeHelpers";

const GET_SHOES_TEMP = "shoe/GET_SHOES_TEMP";

const getShoes = (shoes) => ({
  type: GET_SHOES_TEMP,
  payload: shoes,
});

export const getTheShoes = () => async (dispatch) => {
  const response = await fetch("/api/shoes/", {
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

const initialState = {};

export default function tempShoeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SHOES_TEMP: {
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

    default:
      return state;
  }
}
