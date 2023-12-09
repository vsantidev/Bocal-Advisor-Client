import React from "react";
import Navbar from "../../layouts/navbar/Navbar";
import { Link } from "react-router-dom";
import NavFilter from "../navFilter/navFilter";
import "./home.css";

export default function Home() {
    return (
        <div className="homePage">
            <div className="navContainer">
                <div className="navbar">
                    <Navbar />
                </div>

                <div className="filterNavContainer">
                    <NavFilter/>
                </div>
            </div>
            <div className="content">
                <h1>Avec nous vous ne ferez pas le tour du bocal!</h1>
            </div>
            
        </div>
    )
}
