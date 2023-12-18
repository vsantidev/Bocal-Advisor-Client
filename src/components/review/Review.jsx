import "./Review.css";

export default function Review(props) {
   return (
      <ul>
         <li>  
            <div className="reviewContentFirst">
               <p className="review-user">{props.user_id}</p>
            </div>
   
            <div className="reviewContentTwo">
               <p className="review-comment">{props.comment}</p>
               <p className="rate-comment">{props.rate}</p>

            </div>
            <div className="sublikes">
              <i class="fa-solid fa-heart heart-like"> J'aime !</i>
            </div>
         </li>
      </ul>
   );
};
