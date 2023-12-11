import { useEffect, useState } from "react";
import Review from "./review";
import "./Review.css"


export default function RenderReview(props) {
    
    const [review, setreview] = useState("");
    const [rate, setrate] = useState("")

    const getReview = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    comment: comment,
                    rate: rate,
                }),
            };

            const response = await fetch(
                `http://127.0.0.1:8000/api/review`,
                options
            );
            
            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    useEffect(() => {
        getReview();
    }, []);

    const RenderReview = () => {
        return review?.map((element, index) => {
            console.log(review);
            return (
                <div key={index}>
                    <ul>
                        <Review
                        comment={element.comment}
                        rate={element.rate}
                        place_id={element.place_id}
                        created_ad={element.created_ad} />
                    </ul>
                </div>
            )
        })
    }

    return (
        <>
        <section className="review">{RenderReview()}</section>
        </>
    );
}