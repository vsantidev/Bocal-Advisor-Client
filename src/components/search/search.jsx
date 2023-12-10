import "./Search.css";

function Search() {
  return (
    <div className="search">
      <form action="" method="post">
        <input type="text" name="search" placeholder="quelle destination ?" />
        <button type="submit">rechercher</button>
      </form>
    </div>
  );
}
export default Search;
