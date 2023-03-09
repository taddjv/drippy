const GET_CART = "cart/GET_CART";
const POST_CART_ITEM = "cart/POST_CART_ITEM";
const PUT_CART_ITEM = "cart/PUT_CART_ITEM";
const DELETE_CART_ITEM = "cart/DELETE_CART_ITEM";
const CLEAR_CART = "cart/CLEAR_CART";

const getCart = (cart) => ({
  type: GET_CART,
  payload: cart,
});
const postCartItem = (cart) => ({
  type: POST_CART_ITEM,
  payload: cart,
});
const putCartItem = (cart, cartItemId) => ({
  type: PUT_CART_ITEM,
  payload: cart,
  id: cartItemId,
});
const deleteCartItem = (id) => ({
  type: DELETE_CART_ITEM,
  id: id,
});
const clearCart = () => ({
  type: CLEAR_CART,
});

export const getTheCart = (id) => async (dispatch) => {
  const response = await fetch(`/api/carts/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(getCart(data));
  }
};
export const postTheCartItem = (item, cartId) => async (dispatch) => {
  const { shoe_id, quantity, shoe_size } = item;

  const response = await fetch(`/api/carts/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      shoe_id,
      quantity,
      shoe_size,
    }),
  });
  if (!cartId) {
    return "no user";
  }
  const data = await response.json();
  if (response.ok) {
    if (data.errors) {
      return data.errors;
    }

    dispatch(postCartItem(data));

    return data;
  }
};
export const putTheCartItem = (item, cartItemId) => async (dispatch) => {
  const { shoe_id, quantity, shoe_size } = item;

  const response = await fetch(`/api/carts/cart-item/${cartItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      shoe_id,
      quantity,
      shoe_size,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    if (data.errors) {
      return;
    }

    dispatch(putCartItem(data, cartItemId));

    return data;
  }
};
export const deleteTheCartItem = (id) => async (dispatch) => {
  const response = await fetch(`/api/carts/cart-item/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(deleteCartItem(id));
  }
};
export const clearTheCart = (id) => async (dispatch) => {
  const response = await fetch(`/api/carts/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(clearCart());
    return data;
  }
};

const initialState = {};
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART: {
      let newState = {};
      newState["id"] = action.payload.id;
      action.payload.cart_items.forEach((ele) => {
        newState[ele.id] = ele;
      });
      return newState;
    }
    case POST_CART_ITEM: {
      let newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case PUT_CART_ITEM: {
      let newState = { ...state };
      let itemIndex = Object.keys(newState).find(
        (key) => newState[key]["id"] === action.id
      );
      let item = newState[itemIndex];
      item["quantity"] = action.payload.quantity;
      return newState;
    }
    case DELETE_CART_ITEM: {
      let newState = { ...state };
      let itemIndex = Object.keys(newState).find(
        (key) => newState[key]["id"] === action.id
      );
      delete newState[itemIndex];
      return newState;
    }
    case CLEAR_CART: {
      let newState = { ...state };
      newState = {};

      return newState;
    }
    default:
      return state;
  }
}
