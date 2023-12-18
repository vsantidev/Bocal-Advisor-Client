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
    <>
    {/* <section className="navbar">
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
          <Link to="/register" className="btn">Inscription</Link>
        </nav>
        <nav>
          <Link to="/login" className="btn">Connexion</Link>
        </nav>
      </div>

        )}
      </div>
    </div>


    </section> */}

        <section className="header">
        {/* <div className="home"> */}

          <div className="boxLogo">
            <div className="logo">
              <Link to="/" className="logo">BocalAdvisor</Link>
            </div>

            <div className="searchContainer">
              <Search />
            </div>
          </div>
        {/* </div> */}
        {/* <label className="icons"> */}

                {/* <i className="fa-solid fa-bars"></i> */}
                {/* <div id="search-btn" class="fa-solid fa-magnifying-glass"></div> */}
        {/* </label> */}
        <input type="chexbox" id="check" />
        {/* <div for="" > */}
          <div className="fa-solid fa-xmark icons" id="close-menu"></div>
          <div className="fa-solid fa-bars icons" id="icon-menu"></div>
        {/* </div> */}
        {/* <div id="icons" className="fa-solid fa-bars"></div> */}
          <nav>
            <div className="navbar">
              <div className="navbarLink">
                <Link to="/dashboard" className="Link">Mon profil</Link>
              </div>
              <div className="navbarLink">
                <Link to="/register" className="Link">Inscription</Link>
              </div>
              <div className="navbarLink">
                <Link to="/login" className="Link">Connexion</Link>
              </div>
            </div>
          </nav>

      </section>
      </>
  );
}
