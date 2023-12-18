import "./renderPlaces.css";

function Places(props) {
  return (
    <div className="boxPlaces">
      <div className="content">
        <h2>{props.title}</h2>
        <p>{props.city}</p>
        <p>{props.name_category}</p>
      </div>
      <div className="image-place">
        <img  src={props.file} alt="Place Image" />
      </div>
    </div>
  );
}

export default Places;
