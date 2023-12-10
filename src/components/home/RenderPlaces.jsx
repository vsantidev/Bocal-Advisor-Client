import { useState, useEffect } from "react";
import Places from "./Places";

function RenderPlaces(props) {
  const [places, setPlaces] = useState(null);

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

  useEffect(() => {
    getPlaces();
  }, []);

  const renderPlaces = () => {
    // Renvoie tous les lieux présents dans la database
    return places?.map((element, index) => {
      console.log(places);
      return (
        <div key={index}>
          <ul>
            <Places
              title={element.title}
              street={element.street}
              postcode={element.postcode}
              city={element.city}
              description={element.description}
              category={element.category}
              file={element.file}
            />
          </ul>
        </div>
      );
    });
  };

  return (
    <>
      <div id="test">{renderPlaces()}</div>
    </>
  );
}

export default RenderPlaces;
