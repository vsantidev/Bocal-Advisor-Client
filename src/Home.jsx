import React from "react";
import Navbar from "./layouts/navbar";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <Navbar />
            <h1>Avec nous vous ne ferez pas le tour du bocal!</h1>
        </>
    )
}
