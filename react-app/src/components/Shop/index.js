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
    const queryData = {};
    if (minPrice && maxPrice) {
      queryData["price"] = [minPrice, maxPrice];
    }
    if (color) {
      queryData["color"] = color;
    }
    if (year) {
      queryData["year"] = year;
    }
    dispatch(shoeActions.getTheShoes(sortQuery, search, queryData)).then(
      async (res) => {
        const data = await res;
        if (data.shoes.length) {
          setRenderShoes(true);
        }
      }
    );
    setApplyFilter(false);
    setTransNav(false);
  }, [sortQuery, applyFilter]);

  //! masonry grid layout
  return (
    <div className="shop">
      <div className="shop-sidebar">
        <div className="s-s-title">FILTER</div>
        <div className="s-s-container">
          <div className="s-s-c-price" onClick={() => setShowPrice(!showPrice)}>
            PRICE
            {showPrice && (
              <div className="s-s-c-p" onClick={(e) => e.stopPropagation()}>
                <input
                  onChange={(e) => setMaxPrice(e.target.value)}
                  type="number"
                  placeholder="MAX PRICE"
                  value={maxPrice}
                />
                <input
                  onChange={(e) => setMinPrice(e.target.value)}
                  type="number"
                  placeholder="MIN PRICE"
                  value={minPrice}
                />
              </div>
            )}
          </div>
          <div className="s-s-c-color" onClick={() => setShowColor(!showColor)}>
            COLOR <br />
            {showColor && (
              <>
                {" "}
                <div className="s-s-c-c" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="radio"
                    onChange={(e) => setColor(e.target.value)}
                    name="shoe-color-radio"
                    value="black"
                    id="shoe.black"
                    checked={color === "black"}
                  ></input>
                  <label
                    className={`${
                      color === "black" ? "shoe-color-edit" : null
                    } shoe-black`}
                    for="shoe.black"
                  ></label>
                  <input
                    type="radio"
                    onChange={(e) => setColor(e.target.value)}
                    name="shoe-color-radio"
                    value="white"
                    id="shoe.white"
                    checked={color === "white"}
                  ></input>
                  <label
                    className={`${
                      color === "white" ? "shoe-color-edit" : null
                    } shoe-white`}
                    for="shoe.white"
                  ></label>
                  <input
                    type="radio"
                    onChange={(e) => setColor(e.target.value)}
                    name="shoe-color-radio"
                    value="red"
                    id="shoe.red"
                    checked={color === "red"}
                  ></input>
                  <label
                    className={`${
                      color === "red" ? "shoe-color-edit" : null
                    } shoe-red`}
                    for="shoe.red"
                  ></label>
                  <input
                    type="radio"
                    onChange={(e) => setColor(e.target.value)}
                    name="shoe-color-radio"
                    value="orange"
                    id="shoe.orange"
                    checked={color === "orange"}
                  ></input>
                  <label
                    className={`${
                      color === "orange" ? "shoe-color-edit" : null
                    } shoe-orange`}
                    for="shoe.orange"
                  ></label>
                  <input
                    type="radio"
                    onChange={(e) => setColor(e.target.value)}
                    name="shoe-color-radio"
                    value="yellow"
                    id="shoe.yellow"
                    checked={color === "yellow"}
                  ></input>
                  <label
                    className={`${
                      color === "yellow" ? "shoe-color-edit" : null
                    } shoe-yellow`}
                    for="shoe.yellow"
                  ></label>
                  <input
                    type="radio"
                    onChange={(e) => setColor(e.target.value)}
                    name="shoe-color-radio"
                    value="green"
                    id="shoe.green"
                    checked={color === "green"}
                  ></input>
                  <label
                    className={`${
                      color === "green" ? "shoe-color-edit" : null
                    } shoe-green`}
                    for="shoe.green"
                  ></label>
                  <input
                    type="radio"
                    onChange={(e) => setColor(e.target.value)}
                    name="shoe-color-radio"
                    value="blue"
                    id="shoe.blue"
                    checked={color === "blue"}
                  ></input>
                  <label
                    className={`${
                      color === "blue" ? "shoe-color-edit" : null
                    } shoe-blue`}
                    for="shoe.blue"
                  ></label>
                  <input
                    type="radio"
                    onChange={(e) => setColor(e.target.value)}
                    name="shoe-color-radio"
                    value="purple"
                    id="shoe.purple"
                    checked={color === "purple"}
                  ></input>
                  <label
                    className={`${
                      color === "purple" ? "shoe-color-edit" : null
                    } shoe-purple`}
                    for="shoe.purple"
                  ></label>
                  <input
                    type="radio"
                    onChange={(e) => setColor(e.target.value)}
                    name="shoe-color-radio"
                    value="brown"
                    id="shoe.brown"
                    checked={color === "brown"}
                  ></input>
                  <label
                    className={`${
                      color === "brown" ? "shoe-color-edit" : null
                    } shoe-brown`}
                    for="shoe.brown"
                  ></label>
                  <input
                    type="radio"
                    onChange={(e) => setColor(e.target.value)}
                    name="shoe-color-radio"
                    value="beige"
                    id="shoe.beige"
                    checked={color === "beige"}
                  ></input>
                  <label
                    className={` shoe-beige ${
                      color === "beige" ? "shoe-color-edit" : null
                    }`}
                    for="shoe.beige"
                  ></label>
                </div>
              </>
            )}
          </div>
          <div
            value={year}
            onClick={() => setShowYear(!showYear)}
            className="s-s-c-year"
          >
            RELEASE YEAR
            {showYear && (
              <input
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setYear(e.target.value)}
                type="number"
                placeholder="YEAR"
              ></input>
            )}
          </div>
          <div onClick={() => setShowSize(!showSize)} className="s-s-c-size">
            SIZE
            <br />
            {showSize && (
              <>
                {" "}
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
                ***
              </>
            )}
          </div>
          <button
            className="s-s-c-button"
            onClick={(e) => {
              e.preventDefault();
              setApplyFilter(true);
            }}
          >
            APPLY FILTERS
          </button>
          <button
            className="s-s-c-button"
            onClick={(e) => {
              e.preventDefault();
              setMinPrice(null);
              setMaxPrice(null);
              setColor(null);
              setYear(null);
              setApplyFilter(true);
            }}
          >
            CLEAR FILTERS
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
