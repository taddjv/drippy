import React, { useState } from "react";
import "./Home.css";
import shoe1 from "../../images/pngwing.com.png";
import { NavLink } from "react-router-dom";
import HomeBackground1 from "../../images/Home-background-1";
const Home = () => {
  const [sectionPosition, setSectionPosition] = useState(0);
  const section1 = document.querySelector(".section-1-container");

  if (section1) {
    section1.style.transform = `translate(${sectionPosition}vw)`;
  }

  const s1GoRight = () => {
    if (section1) {
      if (section1.style.transform === "translate(300vw)") {
        setSectionPosition(100);
      } else {
        setSectionPosition(sectionPosition - 100);
      }
    }
  };
  const s1GoLeft = () => {
    if (section1) {
      if (section1.style.transform === "translate(0vw)") {
        setSectionPosition(-200);
      } else {
        setSectionPosition(sectionPosition + 100);
      }
    }
  };
  return (
    <div className="home">
      <div className="section-1-container">
        <section className="home-section-1">
          <HomeBackground1 className="home-background-1" />
          <div className="home-container-1">
            <div className="home-left">
              <img className="h-l-shoe1" src={shoe1} />
            </div>
            <div className="home-right">
              <h1>Air Jordan 1 Retro High OG “Bred Toe”</h1>
              <h2>$555 USD</h2>
              <NavLink exact to="/">
                <button className="h-r-button">BUY NOW</button>
              </NavLink>
            </div>
          </div>
          <button onClick={s1GoLeft} className="h-s-button-left">
            <i class="fa fa-angle-left" />
          </button>
          <button onClick={s1GoRight} className="h-s-button-right">
            <i class="fa fa-angle-right" />
          </button>
        </section>
        <section className="home-section-2">
          <HomeBackground1 className="home-background-1" />
          <div className="home-container-1">
            <div className="home-left">
              <img className="h-l-shoe1" src={shoe1} />
            </div>
            <div className="home-right">
              <h1>Air Jordan 1 Retro High OG “Bred Toe”</h1>
              <h2>$6666 USD</h2>
              <NavLink exact to="/">
                <button className="h-r-button">BUY NOW</button>
              </NavLink>
            </div>
          </div>
          <button onClick={s1GoLeft} className="h-s-button-left">
            <i class="fa fa-angle-left" />
          </button>
          <button onClick={s1GoRight} className="h-s-button-right">
            <i class="fa fa-angle-right" />
          </button>
        </section>
        <section className="home-section-3">
          <HomeBackground1 className="home-background-1" />
          <div className="home-container-1">
            <div className="home-left">
              <img className="h-l-shoe1" src={shoe1} />
            </div>
            <div className="home-right">
              <h1>Air Jordan 1 Retro High OG “Bred Toe”</h1>
              <h2>$77777 USD</h2>
              <NavLink exact to="/">
                <button className="h-r-button">BUY NOW</button>
              </NavLink>
            </div>
          </div>
          <button onClick={s1GoLeft} className="h-s-button-left">
            <i class="fa fa-angle-left" />
          </button>
          <button onClick={s1GoRight} className="h-s-button-right">
            <i class="fa fa-angle-right" />
          </button>
        </section>
      </div>
      <div className="section-2-container"></div>
    </div>
  );
};

export default Home;
