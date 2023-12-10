function Places(props) {
  return (
    <div className="container">
      <h2>{props.title}</h2>
      <p>{props.street}</p>
      <p>{props.postcode}</p>
      <p>{props.city}</p>
      {/* Image ne s'affiche pas :( */}
      <img src={props.file} alt="" />
      <p>{props.description}</p>
      <p>{props.category_id}</p>
    </div>
  );
}

export default Places;
