import * as React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import Search from "../../components/search/Search";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="home">
        <nav>
          <Link to="/" className="brand">BocalAdvisor</Link>
        </nav>
      </div>

      <div className="searchContainer">
        <Search />
      </div>

      <div className="login">
        <nav>
          <Link to="/register" className="login-title">Inscription</Link>
        </nav>
        <nav>
          <Link to="/login" className="login-title">Connexion</Link>
        </nav>
      </div>
    </div>
  );
}
