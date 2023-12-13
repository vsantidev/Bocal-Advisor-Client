function Places(props) {
  return (
    <div className="container">
      <h2>{props.title}</h2>
      <h4>{props.city}</h4>
      {/* Image ne s'affiche pas :( */}
      <img src={props.file} alt="" />
      <h4>{props.category_id}</h4>
    </div>
  );
}

export default Places;
