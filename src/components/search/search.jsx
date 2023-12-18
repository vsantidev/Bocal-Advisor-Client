import { useState } from "react";
import "./Search.css";
import Page from "../page/Page";
import { Link } from "react-router-dom";

function Search() {
  const [value, setValue] = useState('')

  console.log(value);
  return (
    <div className="search">
      <div>
        <input type="text" name="search" placeholder="quelle destination ?" onChange={(e) => setValue(e.target.value)}></input>
      </div>
      <div>
        <button type="submit" onClick={() => handleSearch()}>rechercher</button>
      </div>
      <div>
        <Link to={`/page/${value}`} state={value}>rechercher</Link>
      </div>
      <div id="search-btn" className="fa-solid fa-magnifying-glass"></div>
    </div>
  );
}
export default Search;
