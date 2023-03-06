import React, { useState } from "react";
import "./Home.css";
import jordanBanner from "../../images/jordan1banner.jpg";
import vansBanner from "../../images/vansBanner.jpg";
import converseBanner from "../../images/converseBanner.jpg";
import shoe1 from "../../images/pngwing.com.png";
import shoe2 from "../../images/pngwing.com2.png";
import { NavLink } from "react-router-dom";
import HomeBackground1 from "../../images/Home-background-1";
// import shoe11 from "../../images/jordan1.png";
// react-app/src/images/jordan1Poster.jpeg

const HomeShoes = ({ renderShoes, shoe1, shoe2, shoe3 }) => {
  const [sectionPosition, setSectionPosition] = useState(0);
  const section1 = document.querySelector(".home-section-1");
  const section2 = document.querySelector(".home-section-2");
  const section3 = document.querySelector(".home-section-3");

  if (section1) {
    section1.style.transform = `translate(${sectionPosition}%)`;
    section2.style.transform = `translate(${sectionPosition}%)`;
    section3.style.transform = `translate(${sectionPosition}%)`;
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
    <>
      <div className="home-banner">
        <section className="home-section-1">
          <img className="h-c-1-picture" src={jordanBanner} />
          {renderShoes && (
            <div className="home-container">
              <div className="h-c">
                {" "}
                <h1 className="h-c-title">Our Top Pick</h1>
                <br />
                <h1 className="h-c-title hct2">{shoe1.name}</h1>
              </div>

              <NavLink className="h-c2" exact to={`/shoes/${shoe1.id}`}>
                <button className="h-r-button">BUY NOW</button>
              </NavLink>
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
          <img className="h-c-1-picture" src={vansBanner} />
          {renderShoes && (
            <div className="home-container">
              <div className="h-c">
                {" "}
                <h1 className="h-c-title">Our Second Pick</h1>
                <br />
                <h1 className="h-c-title hct2">{shoe2.name}</h1>
              </div>

              <NavLink className="h-c2" exact to={`/shoes/${shoe2.id}`}>
                <button className="h-r-button">BUY NOW</button>
              </NavLink>
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
          <img className="h-c-1-picture" src={converseBanner} />
          {renderShoes && (
            <div className="home-container">
              <div className="h-c">
                {" "}
                <h1 className="h-c-title">Our Third Pick</h1>
                <br />
                <h1 className="h-c-title hct2">{shoe3.name}</h1>
              </div>

              <NavLink className="h-c2" exact to={`/shoes/${shoe3.id}`}>
                <button className="h-r-button">BUY NOW</button>
              </NavLink>
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
    </>
  );
};

export default HomeShoes;
