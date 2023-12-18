import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import Search from "../../components/search/Search";
import { useState, useEffect } from "react";


export default function Navbar() {

  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@TokenUser');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('@TokenUser');
    navigate("/");
    alert("Vous êtes déconnecté")
    setAuthenticated(false);
  }

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

      <div>
        {authenticated ? (
          <div>
            <nav>
              <Link to="/dashboard" className="login-title">Profil</Link>
            </nav>
            <button onClick={handleLogout}>Au revoir</button>
          </div>
        ) : (
      <div className="login">
        <nav>
          <Link to="/register" className="login-title">Inscription</Link>
        </nav>
        <nav>
          <Link to="/login" className="login-title">Connexion</Link>
        </nav>
      </div>
        )}
      </div>
    </div>
  );
}
