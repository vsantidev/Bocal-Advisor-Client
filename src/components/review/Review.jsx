export default function Review(props) {
    return (
      <div className="box">
        <p>{props.comment}</p>
        <h4>{props.rate}</h4>

        {/* <img src={props.file} alt="" /> */}

      </div>
    );
};