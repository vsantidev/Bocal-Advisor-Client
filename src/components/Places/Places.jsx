function Places(props) {
  return (
    <div className="container">
      <h2>{props.title}</h2>
      <h4>{props.city}</h4>
      {/* Image ne s'affiche pas :( */}
      <img src={props.file} />

      <h4>{props.description}</h4>
      <h4>{props.name_category}</h4>

    </div>
  );
}

export default Places;
