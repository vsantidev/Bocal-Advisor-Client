import "./NavFilter.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function NavFilter() {
  const [value, setValue] = useState('test')

  return (
    <div className="littleFilter">
      <div className="linkFilter">
        <Link to={`/page/${value}`} state={'Hotel'}>Hôtels</Link>
      </div>
      <div className="linkFilter">
        <Link to={`/page/${value}`} state={'Restaurant'}>Restaurant</Link>
      </div>
      <div className="linkFilter">
        <Link to={`/page/${value}`} state={'Activite'}>Activités</Link>
      </div>
      <div className="linkFilter">
        <Link to={`/page/${value}`} state={'Lieux'}>Lieux</Link>
      </div>
    </div>
  );
}
export default NavFilter;
