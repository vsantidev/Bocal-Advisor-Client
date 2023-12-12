import { useEffect, useState } from "react";
import RenderReview from "./RenderReview";


export default function RenderRate(props) {

    const [hasLiked, setHasLiked] = useState(true);

    // LANCEMENT DES DONNÉES AU CHARGEMENT DE LA PAGE
    useEffect(() => {
        getComment();
        }, []);

    const postsLike = async (rate) => {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "bearer " + localStorage.getItem("@TokenUser"),
            },
            
            body: JSON.stringify({
                rate:rate,
            }),
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/review`, options);
            const data = await response.json();
            if (data.success) {
                if (hasLiked === false) {
                    // METTRE UN LIKE
                    setHasLiked(true);
                } else {
                    // ENLEVER UN LIKE
                    setHasLiked(false);
                }
                getComment();
            } else {
                console.error("Échec de la requête HTTP");
            }
        } catch (error) {
            console.error("Erreur lors de la requête : ", error);
        }
    }

   return (
    <>
    </>
   );
}