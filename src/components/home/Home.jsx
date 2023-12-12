import React, { useState } from "react";
import Navbar from "../../layouts/navbar/Navbar";
import { Link } from "react-router-dom";
import NavFilter from "../navFilter/navFilter";
import CreatePlaces from "./CreatePlaces";
import RenderPlaces from "./RenderPlaces";
import "./home.css";
import CreateReview from "../review/CreateReview";
import RenderReview from "../review/RenderReview";

export default function Home() {
  const [value, setValue] = useState('');

  console.log(value);
  return (
    <>
      <div className="homePage">
        <div className="navContainer">
          <div className="navbar">
            <Navbar />
          </div>

          <div className="filterNavContainer">
            <NavFilter />
          </div>
        </div>
        <div className="showcase">
          <h1>Avec nous vous ne ferez pas le tour du bocal !</h1>
        </div>
      </div>

      <div className="places">
        <CreatePlaces></CreatePlaces>
      </div>

      <div className="places">
        <RenderPlaces></RenderPlaces>
      </div>

      <div className="review">
        <CreateReview />
      </div>

      <div className="review">
        <RenderReview />
      </div>
    </>
  );
}
