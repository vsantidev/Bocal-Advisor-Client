import * as React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import Search from "../../components/search/Search";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="home">
        <nav>
          <Link to="/">BocalAdvisor</Link>
        </nav>
      </div>

      <div className="searchContainer">
        <Search />
      </div>

      <div className="login">
        <nav>
          <Link to="/register">Inscription</Link>
        </nav>
        <nav>
          <Link to="/login">Connexion</Link>
        </nav>
      </div>
    </div>
  );
}
