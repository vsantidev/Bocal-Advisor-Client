import { useState, useEffect } from "react";
import Places from "../Places/Places";
import { useLocation } from "react-router-dom";
import Navbar from "../../layouts/navbar/Navbar";
import NavFilter from "../navFilter/navFilter";
import "./Page.css";

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

        /* a mettre dans creation de lieux */
        const api = await fetch("https://api-adresse.data.gouv.fr/search/?q="+valueSearch, options)
        const dataApi = await api.json();
        /*  */

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
                
                
                    <div key={index} className="card">
                        <h2>{element.title}</h2>
                        <h4>{element.city}</h4>
                        {/* Image ne s'affiche pas :( */}
                        <img src={element.file} alt="" />
                        <h4>{element.name_category}</h4>
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
                <div className="cardContainer">
                    {renderPlaces()}
                </div>
                
            </div>

        </div>
    )
}

export default Page;