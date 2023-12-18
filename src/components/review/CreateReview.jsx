import { useEffect, useState } from "react";
import "./Review.css";
import { useLocation } from "react-router";

export default function CreateReview({}) {
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState("");
  const [userId, setUserId] = useState(1);

  let review = { comment, rate };

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
        user_id: userId,
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
  // useEffect(() => {
  //     handleReview();
  //   }, [placeId]);

  return (
    <>
      <section className="create-review">
        <p>Laisser un commentaire et une note à l'établissement :</p>
        <div className="box-create">
          <form action="" method="POST">
            <div>
              <textarea
                name="comment"
                cols="80"
                rows="2"
                placeholder="Décrivez içi vos impressions ..."
                required
                className="review-textarea"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="box-number">
              <div>
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
              </div>
              <div>
              <button
                type="submit"
                className="login-title"
                onClick={handleReview}
              >
                Valider
              </button>
              </div>

              {/* <div>
                <label htmlFor="">Postez une photo de type : png, jpg, jpeg</label>
              <input
                  type="file"
                  name="picture_id"
                  className="review-input"
                  onChange={(e) => setRate(e.target.value)}
                />
              </div> */}
            </div>


          </form>
        </div>

      </section>
    </>
  );
}
