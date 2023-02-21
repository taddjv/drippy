const GET_BRAND = "BRAND/GET_BRAND";
const GET_BRANDS = "BRAND/GET_BRANDS";
const GET_TOP_BRANDS = "BRAND/GET_TOP_BRANDS";
const POST_BRAND = "BRAND/POST_BRAND";
const PUT_BRAND = "BRAND/PUT_BRAND";
const DELETE_BRAND = "BRAND/DELETE_BRAND";

const getBrand = (brand) => ({
  type: GET_BRAND,
  payload: brand,
});
const getBrands = (brands) => ({
  type: GET_BRANDS,
  payload: brands,
});
const getTopBrands = (brands) => ({
  type: GET_TOP_BRANDS,
  payload: brands,
});
const postBrand = (brand) => ({
  type: POST_BRAND,
  payload: brand,
});
const putBrand = (brand) => ({
  type: PUT_BRAND,
  payload: brand,
});
const deleteBrand = () => ({
  type: DELETE_BRAND,
});

//! not used yet
export const getTheBrand = (id) => async (dispatch) => {
  const response = await fetch(`/api/brands/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(getBrand(data));
  }
};
//! not used yet
export const getTheBrands = () => async (dispatch) => {
  const response = await fetch(`/api/brands/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(getBrands(data));
  }
};
export const getTheTopBrands = () => async (dispatch) => {
  const response = await fetch(`/api/brands/top`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(getTopBrands(data));
  }
};
//! not used yet
export const postTheBrand = (brandData) => async (dispatch) => {
  const { name, url, description } = brandData;

  const response = await fetch(`/api/brands/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name,
      url,
      description,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(postBrand(data));
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
//! not used yet
export const putTheBrand = (id, brandData) => async (dispatch) => {
  const { name, url, description } = brandData;

  const response = await fetch(`/api/brands/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name,
      url,
      description,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(putBrand(data));
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
//! not used yet
export const deleteTheBrand = (id) => async (dispatch) => {
  const response = await fetch(`/api/brands/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteBrand());
    return data;
  }
};

const initialState = {};

export default function brandReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BRAND: {
      let newState = { ...state };
      newState = action.payload;
      return newState;
    }
    case GET_BRANDS: {
      let newState = { ...state };
      newState = {};
      action.payload.brands.forEach((ele, i) => {
        newState[i] = ele;
      });
      return newState;
    }
    case GET_TOP_BRANDS: {
      let newState = { ...state };
      newState = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
