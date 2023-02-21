import React, { useState } from "react";
import "./Home.css";
import shoe1 from "../../images/pngwing.com.png";
import shoe2 from "../../images/pngwing.com2.png";
import { NavLink } from "react-router-dom";
import HomeBackground1 from "../../images/Home-background-1";

const HomeShoes = ({ renderShoes, shoe1, shoe2, shoe3 }) => {
  const [sectionPosition, setSectionPosition] = useState(0);
  const section1 = document.querySelector(".section-1-container");

  if (section1) {
    section1.style.transform = `translate(${sectionPosition}%)`;
  }

  const s1GoRight = () => {
    if (section1) {
      if (section1.style.transform === "translate(-200%)") {
        setSectionPosition(0);
      } else {
        setSectionPosition(sectionPosition - 100);
      }
    }
  };
  const s1GoLeft = () => {
    if (section1) {
      if (section1.style.transform === "translate(0%)") {
        setSectionPosition(-200);
      } else {
        setSectionPosition(sectionPosition + 100);
      }
    }
  };
  return (
    <div className="section-1-container">
      <section className="home-section-1">
        <HomeBackground1 className="home-background-1" />
        {renderShoes && (
          <div className="home-container-1">
            <div className="home-left">
              <img className="h-l-shoe1" src={shoe1.url} />
            </div>
            <div className="home-right">
              <h1>{shoe1.name}</h1>
              <h2>${shoe1.price} USD</h2>
              <NavLink exact to={`/shoes/${shoe1.id}`}>
                <button className="h-r-button">BUY NOW</button>
              </NavLink>
            </div>
          </div>
        )}

        <button onClick={s1GoLeft} className="h-s-button-left">
          <i class="fa fa-angle-left" />
        </button>
        <button onClick={s1GoRight} className="h-s-button-right">
          <i class="fa fa-angle-right" />
        </button>
      </section>
      <section className="home-section-2">
        <HomeBackground1 className="home-background-1" />
        {renderShoes && (
          <div className="home-container-1">
            <div className="home-left">
              <img className="h-l-shoe1" src={shoe2.url} />
            </div>
            <div className="home-right">
              <h1>{shoe2.name}</h1>
              <h2>${shoe2.price} USD</h2>
              <NavLink exact to={`/shoes/${shoe2.id}`}>
                <button className="h-r-button">BUY NOW</button>
              </NavLink>
            </div>
          </div>
        )}
        <button onClick={s1GoLeft} className="h-s-button-left">
          <i class="fa fa-angle-left" />
        </button>
        <button onClick={s1GoRight} className="h-s-button-right">
          <i class="fa fa-angle-right" />
        </button>
      </section>
      <section className="home-section-3">
        <HomeBackground1 className="home-background-1" />
        {renderShoes && (
          <div className="home-container-1">
            <div className="home-left">
              <img className="h-l-shoe1" src={shoe3.url} />
            </div>
            <div className="home-right">
              <h1>{shoe3.name}</h1>
              <h2>${shoe3.price} USD</h2>
              <NavLink exact to={`/shoes/${shoe3.id}`}>
                <button className="h-r-button">BUY NOW</button>
              </NavLink>
            </div>
          </div>
        )}
        <button onClick={s1GoLeft} className="h-s-button-left">
          <i class="fa fa-angle-left" />
        </button>
        <button onClick={s1GoRight} className="h-s-button-right">
          <i class="fa fa-angle-right" />
        </button>
      </section>
    </div>
  );
};

export default HomeShoes;
