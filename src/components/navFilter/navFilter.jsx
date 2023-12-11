import "./NavFilter.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function NavFilter() {
  const [value, setValue] = useState('test')

  return (
    <div className="littleFilter">
      <div className="linkFilter">
      <Link to={`/page/${value}`} state={'hotel'}>Hôtels</Link>
      </div>
      <div className="linkFilter">
        <a href="">Restaurants</a>
        <Link to={`/page/${value}`} state={'restaurant'}>Restaurant</Link>
      </div>
      <div className="linkFilter">
        <a href="">Activités</a>
        <Link to={`/page/${value}`} state={'activite'}>Activités</Link>
      </div>
      <div className="linkFilter">
        <a href="">Lieux</a>
        <Link to={`/page/${value}`} state={2}>Lieux</Link>
      </div>
    </div>
  );
}
export default NavFilter;
