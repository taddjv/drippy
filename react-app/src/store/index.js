import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import shoeReducer from "./shoe";
import brandReducer from "./brand";
import reviewReducer from "./review";
import cartReducer from "./cart";
import tempShoeReducer from "./tempShoe";

const rootReducer = combineReducers({
  session,
  shoeReducer,
  brandReducer,
  reviewReducer,
  cartReducer,
  tempShoeReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
