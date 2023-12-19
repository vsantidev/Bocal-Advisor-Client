import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import "./showPlacew.css";
import Leaflet from "./leafletMap";
import Review from "../review/Review";
import RenderReview from "../review/RenderReview";
import CreateReview from "../review/CreateReview";
import Navbar from "../../layouts/navbar/Navbar";

function Show({ placeId }) {
  const [user, setUser] = useState({});
  const [place, setPlace] = useState("null");
  const navigate = useNavigate();
  const [review, setReview] = useState([]);
  const [error, setError] = useState(null);
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const value = useLocation().state;

  // ------------- RECUPERE LES DETAILS DU LIEU A AFFICHER -------------- //
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

      setPlace(data.place);
      setReview(data.review);

      setLatitude(place.y);
      setLongitude(place.x);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // ------------- SUPPRIMER -------------- //
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/delete/${value}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        console.log(data.message);
        navigate("/");
        alert(data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    // ------------- VERIFIE SI L'UTILISATEUR EST BIEN CONNECTE POUR POUVOIR COMMENTER -------------- //
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem("@TokenUser");

        if (!token) {
          setError("Connectez-vous pour pouvoir commenter");
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/api/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.success);
        } else {
          setError("Connectez-vous pour pouvoir commenter.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Connectez-vous pour pouvoir commenter.");
      }
    };

    getUserProfile();
    handleShow();
  }, [placeId]);

  // ------------- AFFICHE LE LIEU -------------- //
  const renderPlace = () => {
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
              <button onClick={handleDelete}>Supprimer</button>
            </li>
          </ul>
        </div>

        <div className="emplacement">
          {longitude != undefined || latitude != undefined ? (
            <Leaflet latitude={latitude} longitude={longitude}></Leaflet>
          ) : (
            <div>erreur recuperation des données de localisation</div>
          )}
        </div>

        <div className="reviews"></div>
      </div>
    );
  };

  //  RENDRE LES DONNÉES VISIBLES PAR L'UTILISATEUR POUR LES REVIEWS
  const renderMyReview = () => {
    // myReview.splice(6);
    return review.map((element, index) => {
      return (
        <div key={index}>
          <Review
            comment={element.comment}
            rate={element.rate}
            reviewId={element.id}
            user_id={element.user_id}
            file_Review={element.file_Review}
          />
        </div>
      );
    });
  };

  console.log("place", placeId);
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div>{renderPlace()}</div>
      {user.role === "membre" && (
        <div>
          <CreateReview />
        </div>
      )}
      <div>{renderMyReview()}</div>
    </>
  );
}

export default Show;
