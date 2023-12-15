import "./Review.css";

export default function Review(props) {
   return (
      <ul>
         <li>
            <div className="commentContainer">
               <p className="contentComment">{props.comment}</p>
               <p className="contentComment">{props.rate}</p>
               <p className="contentComment">{props.user_id}</p>
            </div>
         </li>
      </ul>
   );
};
