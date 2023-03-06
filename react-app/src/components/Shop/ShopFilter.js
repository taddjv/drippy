import React from "react";

const ShopFilter = () => {
  return (
    <div className="shop-sidebar">
      <div className="s-s-title">Filter</div>
      <div className="s-s-container">
        <div className="s-s-c-price">
          PRICE
          <div className="s-s-c-p">
            <input type="number" placeholder="MAX PRICE" />
            <input type="number" placeholder="MIN PRICE" />
          </div>
        </div>
        <div className="s-s-c-color">
          COLOR <br />
          <select>
            <option>Choose Color</option>
            <option>Black</option>
            <option>White</option>
            <option>Red</option>
            <option>Orange</option>
            <option>Yellow</option>
            <option>Green</option>
            <option>Blue</option>
            <option>purple</option>
          </select>
        </div>
        <div className="s-s-c-year">
          RELEASE YEAR
          <input type="number" placeholder="RELEASE YEAR"></input>
        </div>
        <div className="s-s-c-size">
          SIZE
          <br />
          <select>
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
        </div>
        <button>apply filter</button>
      </div>
    </div>
  );
};

export default ShopFilter;
