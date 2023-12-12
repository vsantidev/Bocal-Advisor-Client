import "./Review.css";

export default function Review(props) {
   return (
      <ul>
         <li>
            <div className="commentContainer">
               <p className="contentComment">{props.comment}</p>
            </div>
         </li>
      </ul>
   );
};
