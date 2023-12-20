import { useState, useEffect } from "react";
import Places from "../Places/Places";
import { useLocation } from "react-router-dom";
import Navbar from "../../layouts/navbar/Navbar";
import NavFilter from "../navFilter/navFilter";
import "./Page.css";
import { Link } from "react-router-dom";

function Page(){
    const [places, setPlaces] = useState([]);
    const [valueSearch, setValueSearch] = useState('')
    
    let value  = useLocation().state;

    useEffect(() => {
        getPlaces();
      }, [valueSearch]);
  
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

            if (Object.values(element).includes(valueSearch)) {
            
                console.log("test: ", element);
                return (
                
                  <Link to={`/show/${element.id}`} state={element.id}>
                    <Places             
                      title={element.title}
                      city={element.city}
                      category={element.category}
                      file={element.file}
                      name_category={element.name_category}
                    />
                  </Link>
                
            
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
        <div className="page">
            <div className="navContainer">
                <div className="navbar">
                    <Navbar />
                </div>

                <div className="filterNavContainer">
                    <NavFilter />
                </div>
            </div>

            <div className="container">
                {value != null || value != undefined ? 
                  <div className="cardContainer">
                      {renderPlaces()}
                  </div>
                : 
                  <div>
                    <h2>rechercher introuvable</h2>
                  </div>
                }
            </div>

        </div>
    )
}

export default Page;