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
    <>
    {/* SECTION REVIEWS - START */}
    <div className="renderMyReview">
      <div className="reviewContentFirst">
        <div className="reviewContentUser">
          <div className="reviewContentAvatar">
            {/* <div> */}
            <i className="fa-solid fa-circle-user avatar"></i> 
          </div>

          <div className="reviewContentUsername">
            <p className="review-user"> Username : {props.user_id}</p>
            <p className="review-date">{props.created_at}</p>
          </div>
          {/* </div> */}
        </div>

        <div className="reviewContentRate">
          <p className="rate-comment">{props.rate} <span className="spanRate"> /5</span></p>
        </div>
      </div>
      <div className="sublikes">
        <div>
          <p>150</p>
        </div>
        <div>
          <i className="fa-solid fa-heart heart-like"> J'aime !</i>
        </div>
        <div>
          <p>20</p>
        </div>
        <div>
          <i class="fa-solid fa-heart-crack heart-like">Je n'aime pas !</i>
        </div>

      </div>

      <div className="reviewContentTwo">
        <div className="reviewContentComment">
          <div className="reviewDivComment">
            <p className="review-comment">{props.comment}</p>
            {/* <img className="review-file" src={props.file_review} alt="image non fournie"/> */}
          </div>
          <div className="reviewDivFile">
            <img className="review-file" src={props.file_review} alt="image non fournie"/>
          </div>
          <div className="reviewDivEdit">
          <button className="buttonReviewEdit" type="submit" onClick={()=>DeleteReview(props.reviewId)}>SUPPRIMER</button>
          <button  className="buttonReviewDelete" type="submit" onClick={()=>DeleteReview(props.reviewId)}>MODIFIER</button>

          </div>

          
        </div>


      </div>

      {/* <div className="reviewContentButton">
          <p><button type="submit" onClick={()=>DeleteReview(props.reviewId)}>SUPPRIMER</button></p>
        </div> */}


    </div>
    {/* SECTION REVIEWS - END */}
    </>
   );
};