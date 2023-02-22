import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as shoeActions from "../../store/shoe";
import { ShopShoe } from "./ShopShoe";
import { storeShoesRender } from "../../helpers/storeHelpers";
import "./Shop.css";
const Shop = () => {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.shoeReducer);
  const [renderShoes, setRenderShoes] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("default");

  const getShoes = (e) => {
    e.preventDefault();
    let search = searchQuery;
    if (!searchQuery) {
      search = "all";
    }
    dispatch(shoeActions.getTheShoes(sortQuery, search)).then(async (res) => {
      const data = await res;

      if (data.shoes.length) {
        setRenderShoes(true);
      } else {
        setRenderShoes(false);
      }
    });
  };
  useEffect(() => {
    let search = searchQuery;
    if (!searchQuery) {
      search = "all";
    }
    dispatch(shoeActions.getTheShoes(sortQuery, search)).then(async (res) => {
      const data = await res;
      if (data.shoes.length) {
        setRenderShoes(true);
      }
    });
  }, [sortQuery]);

  //! masonry grid layout
  return (
    <div className="shop">
      <div className="shop-sidebar">sidebar</div>

      <div className="shop-right">
        <div className="shop-container-top">
          <form onSubmit={getShoes} className="s-c-t-search">
            <input
              type="text"
              value={searchQuery}
              className="s-c-t-s-input"
              placeholder="Find your pair here !"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <button type="submit" className="s-c-t-s-search">
              <i class="fa fa-search s-c-t-s-s-logo" aria-hidden="true"></i>
            </button>
          </form>
          <select
            className="s-c-t-s-select"
            onChange={(e) => {
              setSortQuery(e.target.value);
            }}
            value={sortQuery}
          >
            <option value="default">Default</option>
            <option value="reviews">Most Reviews</option>
            <option value="expensive">Most Expensive</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>
        {renderShoes ? (
          <div className="shop-container">
            {storeShoesRender(shoes).map((ele) => {
              return (
                <NavLink exact to={`/shoes/${ele.id}`}>
                  <ShopShoe
                    count={ele.count}
                    url={ele.url}
                    name={ele.name}
                    price={ele.price}
                    reviews={ele.reviews}
                  />
                </NavLink>
              );
            })}
          </div>
        ) : (
          <div className="shop-container-nothing">No Results Found</div>
        )}
      </div>
    </div>
  );
};

export default Shop;
