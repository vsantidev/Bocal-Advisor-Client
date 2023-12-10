import "./Search.css";

function Search() {
  return (
    <div className="search">
      <form action="" method="post">
        <input type="text" name="search" placeholder="Des endroits à découvrir ?" />
        <button type="submit" className="fa-solid fa-magnifying-glass"></button>
      </form>
    </div>
  );
}
export default Search;
