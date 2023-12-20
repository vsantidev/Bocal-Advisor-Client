import { useState } from "react";
import "./Search.css";
import Page from "../page/Page";
import { Link } from "react-router-dom";

function Search() {
  const [value, setValue] = useState()

  return (
    <div className="search">
      <div>
        <input type="text" name="search" placeholder="Quelle destination ?" onChange={(e) => setValue(e.target.value)}></input>
      </div>
      {/* <div>
        <button type="submit" onClick={() => handleSearch()}>rechercher</button>
      </div> */}
      <div>
        {/* state = utilisée pour définir une valeur avec état pour le nouvel emplacement qui est stocké dans l'historique state . */}
        <Link to={`/page/${value}`} state={value}>rechercher</Link>
      </div>
      <div id="search-btn" className="fa-solid fa-magnifying-glass"></div>
    </div>
  );
}
export default Search;
