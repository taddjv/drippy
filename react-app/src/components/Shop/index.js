import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as shoeActions from "../../store/shoe";
import { ShopShoe } from "./ShopShoe";
import { storeShoesRender } from "../../helpers/storeHelpers";
import ShopFilter from "./ShopFilter";
import "./Shop.css";
const Shop = () => {
  const dispatch = useDispatch();
  const { setTransNav } = useModal();

  const shoes = useSelector((state) => state.shoeReducer);
  const [renderShoes, setRenderShoes] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("default");
  const [applyFilter, setApplyFilter] = useState(false);

  const [showPrice, setShowPrice] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [showSize, setShowSize] = useState(false);

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [color, setColor] = useState(null);
  const [year, setYear] = useState(null);
  const [size, setSize] = useState(null);

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
    if (minPrice && maxPrice) {
      const data = { price: [minPrice, maxPrice] };
      dispatch(shoeActions.getTheShoes(sortQuery, search, data)).then(
        async (res) => {
          const data = await res;
          if (data.shoes.length) {
            setRenderShoes(true);
          }
        }
      );
    } else if (color) {
      const data = { color: color };
      dispatch(shoeActions.getTheShoes(sortQuery, search, data)).then(
        async (res) => {
          const data = await res;
          if (data.shoes.length) {
            setRenderShoes(true);
          }
        }
      );
    } else {
      dispatch(shoeActions.getTheShoes(sortQuery, search)).then(async (res) => {
        const data = await res;
        if (data.shoes.length) {
          setRenderShoes(true);
        }
      });
    }
    setApplyFilter(false);
    setTransNav(false);
  }, [sortQuery, applyFilter]);

  //! masonry grid layout
  return (
    <div className="shop">
      <div className="shop-sidebar">
        <div className="s-s-title">Filter</div>
        <div className="s-s-container">
          <div className="s-s-c-price" onClick={() => setShowPrice(!showPrice)}>
            PRICE
            {showPrice && (
              <div className="s-s-c-p" onClick={(e) => e.stopPropagation()}>
                <input
                  onChange={(e) => setMaxPrice(e.target.value)}
                  type="number"
                  placeholder="MAX PRICE"
                />
                <input
                  onChange={(e) => setMinPrice(e.target.value)}
                  type="number"
                  placeholder="MIN PRICE"
                />
              </div>
            )}
          </div>
          <div className="s-s-c-color" onClick={() => setShowColor(!showColor)}>
            COLOR <br />
            {showColor && (
              <select onClick={(e) => e.stopPropagation()}>
                <option>Choose Color</option>
                <option>Black</option>
                <option>White</option>
                <option>Red</option>
                <option>Orange</option>
                <option>Yellow</option>
                <option>Green</option>
                <option>Blue</option>
                <option>Purple</option>
                <option>Brown</option>
                <option>Beige</option>
              </select>
            )}
          </div>
          <div onClick={() => setShowYear(!showYear)} className="s-s-c-year">
            RELEASE YEAR
            {showYear && (
              <input
                onClick={(e) => e.stopPropagation()}
                type="number"
                placeholder="RELEASE YEAR"
              ></input>
            )}
          </div>
          <div onClick={() => setShowSize(!showSize)} className="s-s-c-size">
            SIZE
            <br />
            {showSize && (
              <select onClick={(e) => e.stopPropagation()}>
                <option>Select Size</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setApplyFilter(true);
            }}
          >
            apply filter
          </button>
        </div>
      </div>

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
