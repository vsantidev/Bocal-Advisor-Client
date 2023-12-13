import { useState, useEffect } from "react";
import Places from "../Places/Places";
import { useLocation } from "react-router-dom";

function Page() {
  const [places, setPlaces] = useState([]);
  /* const [valueSearch, setValueSearch] = useState(2) */

  let value = useLocation().state;

  useEffect(() => {
    getPlaces();
  }, []);

  const getPlaces = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`http://127.0.0.1:8000/api/post`, options);
      const data = await response.json();

      // Vérifions si le premier élément de data est bien un tableau
      if (Array.isArray(data["0"])) {
        // Si oui, places prend la valeur de celui-ci
        setPlaces(data["0"]);
      } else {
        // Si non, erreur
        console.error("Pas un tableau:", data);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const renderPlaces = () => {
    // Renvoie tous les lieux présents dans la database
    return places?.map((element, index) => {
      /*           console.log(places);
          console.log("element: ", element.category_id); */
      if (element.category_id == value) {
        return (
          <div key={index}>
            <ul>
              <Places
                title={"titre : " + element.title}
                street={element.street}
                postcode={element.postcode}
                city={element.city}
                description={element.description}
                category={"category : " + element.category}
                file={element.file}
              />
            </ul>
          </div>
        );
      }
    });
  };

  console.log("page", value);
  return <div>{renderPlaces()}</div>;
}

export default Page;
