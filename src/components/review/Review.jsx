import { useEffect, useState } from "react";
import "./Review.css";
import { useLocation } from "react-router";

export default function Review(props) {

   const value = useLocation().state;

      const DeleteReview = async (MyId) =>{
 
      let options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: MyId,
          }),
        };
  
      try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/show/${value}`,
            options
          );
         console.log(options);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log("data", data);
    
          //  =========> TOKEN CONNECTION
          if (data) {
            alert(data.message);
          } else {
            alert("TRY AGAIN :( ");
          }
        } catch (error) {
          console.error("Erreur:", error);
        }

  };

   return (
      <ul>
         <li>  
            <div className="reviewContentFirst">
               {/* <p className="review-user">{props.user_id}</p> */}
            </div>
   
            <div className="reviewContentTwo">
               <p className="review-comment">{props.comment}</p>
               <p className="rate-comment">{props.rate}</p>
               {/* <p className="rate-comment">{props.reviewId}</p> */}
               <img src={props.file_review} alt="image non fournie"/>
               <p><button type="submit" onClick={()=>DeleteReview(props.reviewId)}>SUPPRIMER</button></p>
            </div>
            <div className="sublikes">
              <i className="fa-solid fa-heart heart-like"> J'aime !</i>
            </div>
         </li>
      </ul>
   );
};