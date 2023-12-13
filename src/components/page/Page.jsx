import { useState, useEffect } from "react";
import Places from "../Places/Places";
import { useLocation } from "react-router-dom";

function Page(){
    const [places, setPlaces] = useState([]);
    const [valueSearch, setValueSearch] = useState('')

    let value  = useLocation().state;


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
            console.log("element",element);
            console.log("value : ", valueSearch);

          if (Object.values(element).includes(valueSearch)) {
            
            return (
                <div key={index}>
                  <ul>
                        <li>
                            <h1>test</h1>
                            <h2>{element.title}</h2>
                            <h4>{element.street}</h4>
                            <h4>{element.postcode}</h4>
                            <h4>{element.city}</h4>
                            {/* Image ne s'affiche pas :( */}
                            <img src={element.file} alt="" />
                            <h4>{element.description}</h4>
                            <h4>{element.name_category}</h4>
                        </li>
                        
  
                        
                  </ul>
                </div>
              );
          }

        });
    }
    if(value != null && value != valueSearch){
        console.log("fe: ", value);
        setValueSearch(value);
    }

    console.log("page",value);
    return(
        <div>
            <div></div>

            <div className="container">
                {renderPlaces()}
            </div>
            
        </div>
    )
}

export default Page;