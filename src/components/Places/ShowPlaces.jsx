import { useState, useEffect } from "react";
import Places from "./Places";
import { useLocation } from "react-router";
import "./showPlacew.css";
import Leaflet from "./leafletMap";


function Show({ placeId }) {
  const [place, setPlace] = useState("null");
  const [latitude, setLatitude] = useState(''); // Y
  const [longitude, setLongitude] = useState(''); // x

  const value = useLocation().state;
  
  // recuperation des data du lieu
  const handleShow = async () => {
    let options = {
      method: "GET",
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/show/${value}`,
        options
      );
      if (!response.ok) {
        console.log(response);

        alert(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data", data[0]);
      setPlace(data[0]);
      if (data) {
        alert(data.message);
      } else {
        alert("TRY AGAIN");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    handleShow();
  }, [placeId]);

  const renderPlace = () => {   
    if(latitude == undefined){
      setLatitude(place.y)
    }
    if(longitude == undefined){
      setLongitude(place.x)
    }

    return (
      <div>
        <div className="info">
          <ul>
            <li>
              <h1>{place.title}</h1>
              <h2>{place.street}</h2>
              <h2>{place.postcode}</h2>
              <h2>{place.city}</h2>
              <img src={place.file}></img>
              <h2>{place.description}</h2>
              <h2>{place.name_category}</h2>
            </li>
          </ul>
        </div>

        <div className="emplacement">
          <Leaflet latitude={latitude} longitude={longitude} ></Leaflet>
        </div>

        <div className="reviews">

        </div>
      </div>
    );
  };
  
  console.log('showPlace : ', place.x);
/*   if(latitude == undefined){
    setLatitude(43.704194)
  }
  if(place.x == undefined){
    setLongitude(7.274215)
  } */
/*     setLongitude(place.x)
   */
  return <div>{renderPlace()}</div>;
}

export default Show;
