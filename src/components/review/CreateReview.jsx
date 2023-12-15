import { useEffect, useState } from "react";
import "./Review.css"
import { useLocation } from "react-router";

export default function CreateReview({}) {
    const [comment, setComment] = useState("");
    const [rate, setRate] = useState("");
    const [userId, setUserId] = useState(1);

    let review = { comment, rate};

    const value = useLocation().state;
    console.log("loc", value);

    //  RÉCUPÉRATION DES DONNÉES DE L'API
    const handleReview = async (e) => {
        console.log("review: ", review);
        e.preventDefault();

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment: comment,
                rate: rate,
                place_id: value,
                user_id: userId

            }),
        };

        console.log(`option :`, options);
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/show/${value}`,
                options
            );

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("data", data);
      
            // =========> TOKEN CONNECTION
            // if (data.token) {
            //   alert(data.message);
            // } else {
            //   alert("TRYAGAIN ");
            // }
          } catch (error) {
            console.error("Erreur:", error);
          }
    };
    // useEffect(() => {
    //     handleReview();
    //   }, [placeId]);



    return (
      <>
        <section className="create-review">
            <div className="boxcontainer">
                <form action="" method="POST">
                    <textarea
                        name="comment"
                        cols="80"
                        rows="2"
                        placeholder="Décrivez içi vos impressions ..."
                        required
                        className="review-textarea"
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <input
                        type="number"
                        name="rate"
                        placeholder="Notez le lieu sur 5"
                        required
                        min="0"
                        max="5"
                        // className="box"
                        className="review-input"
                        onChange={(e) => setRate(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="login-title"
                        onClick={handleReview}
                    >
                        Valider
                    </button>
                </form>
            </div>
            
            <div className="sublikes">
                <i class="fa-solid fa-heart heart-like"> J'aime !</i>
            </div>
        </section>
        </>
    );
}
