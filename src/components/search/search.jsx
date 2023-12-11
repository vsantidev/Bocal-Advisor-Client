import { useState } from "react";
import "./Search.css";
import Page from "../page/Page";
import { Link } from "react-router-dom";

function Search() {
  const [value, setValue] = useState('')

  console.log(value);
  return (
    <div className="search">

        <input type="text" name="search" placeholder="quelle destination ?" onChange={(e) => setValue(e.target.value)} />
        <button type="submit" onClick={() => handleSearch()}>rechercher</button>
        <Link to={`/page/${value}`} state={value}>rechercher</Link>
    </div>
  );
}
export default Search;
