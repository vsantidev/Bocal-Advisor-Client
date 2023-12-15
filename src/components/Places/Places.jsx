import "./renderPlaces.css";

function Places(props) {
  return (
    <div className="container">
      <h2>{props.title}</h2>
      <h4>{props.city}</h4>
      <img src={props.file} alt="Place Image" />
      <h4>{props.name_category}</h4>
    </div>
  );
}

export default Places;
