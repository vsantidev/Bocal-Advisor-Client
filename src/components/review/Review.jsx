import { useEffect, useState } from "react";
import "./Review.css";
import { useLocation } from "react-router";

let id_review;
let comment;
let rate; 
let file;

export default function Review(props) {

  const [editing, setEditing] = useState(false);
  const [newReview, setNewReview] = useState({});

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


  const EditReview = (reviewId, paramComment, paramRate, paramFile) => {

    id_review = reviewId;

    setEditing(true);
    setNewReview({
      "comment": paramComment,
      "rate": paramRate,
      "file": paramFile,
      "reviewId": reviewId,
    });

  }



  const EditClose = () => {
    setEditing(false);
  }

  const sendEdit = async() => {

    console.log('file', file);
    try {


    let options = {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        'comment': comment != undefined ? comment : props.comment,
        'rate': rate != undefined ? rate : props.rate,
        'file_review': file != undefined ? file : props.file,
        'review_id': id_review,
      }),

    };
    console.log('file', options);
      const response = await fetch("http://127.0.0.1:8000/api/update", options);
      
      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data", data);
      if (data) {
        alert(data.message);
      } else {
        alert("TRY AGAIN");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }

  }
   return (
      <ul>
         <li>  
            
            {editing ? (
              <>
              <div className="edit_review">
                  
                <div className="form">
                  <input type="text" value={newReview.comment} onChange={(e) => {setNewReview(e.target.value); comment = e.target.value}}/>
                  <input type="number" id="" max={5} min={0} value={newReview.rate} onChange={(e) => {setNewReview(e.target.value); rate = e.target.value}}/>
                  <input type="file" id="" onChange={(e) => {file = e.target.value}} />
                  <button type="button" onClick={() => sendEdit(newReview.comment)}>modifier</button>
                </div>
      
                <div className="fa-solid fa-xmark iconsbtn x-btn" id="close-menu" onClick={()=>EditClose()} ></div>
              </div>
    
         
            </>
            
            ) : (
              <>
              <div className="reviewContentFirst">
                  {/* <p className="review-user">{props.user_id}</p> */}
                </div>
                
                <div className="reviewContentTwo">
                  <p className="review-comment">{props.comment}</p>
                  <p className="rate-comment">{props.rate}</p>
                  {/* <p className="rate-comment">{props.reviewId}</p> */}
                  <img src={props.file_Review} />
                  <p><button type="submit" onClick={()=>DeleteReview(props.reviewId)}>SUPPRIMER</button></p>
                  <p><button type="submit" onClick={()=>EditReview(props.reviewId, props.comment, props.rate, props.file_Review)}>MODIFIER</button></p>
                </div>
                <div className="sublikes">
                  <i className="fa-solid fa-heart heart-like"> J'aime !</i>
                </div>
              </>
            )};
            
         </li>



      </ul>
   );
};