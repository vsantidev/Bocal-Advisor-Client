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
  // tableau de tous les commentaire en lien avec le lieu
  const [reviewVariable, setReviewVariable] = useState([]);
  const [error, setError] = useState(null);

  /* ---- VALEUR POUR LA CARTE -------- */
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const value = useLocation().state;
  const navigate = useNavigate();

  // ------------- RECUPERE LES DETAILS DU LIEU A AFFICHER -------------- //

  const handleShow = async () => {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/show/${value}`,
        options
      );

      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("handleshow");
      setPlace(data.place);
      setReviewVariable(data.review);

      setLatitude(data.place.y);
      setLongitude(data.place.x);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // ------------- SUPPRIMER -------------- //
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/delete/${value}`,
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
    handleShow();

    // ------------- VERIFIE SI L'UTILISATEUR EST BIEN CONNECTE POUR POUVOIR COMMENTER -------------- //

    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem("@TokenUser");

        if (!token) {
          setError("Connectez-vous pour pouvoir commenter");
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
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
  }, [placeId]);

  // ------------- AFFICHE LE LIEU -------------- //
  const renderPlace = () => {
    return (
      <div>
        <div className="info">
          <ul>
            <li>
              <div className="showTitle">
                <h1>{place.title}</h1>
                <h2>{place.name_category}</h2>
              </div>
              <div className="showContent">
                <div className="about">
                  <h2>A Propos</h2>
                  <p>{place.description}</p>
                </div>
                <div className="showFile">
                  <img src={place.file}></img>
                </div>
              </div>
              <div className="showLocation">
                <h2>{place.street}</h2>
                <h2>{place.postcode}</h2>
                <h2>{place.city}</h2>
              </div>
              <button className="button" onClick={handleDelete}>
                Supprimer
              </button>
            </li>
          </ul>
        </div>
        {/* ------- DEBUT DE LA CARTE  */}
        <div className="emplacement">
          {longitude != undefined || latitude != undefined ? (
            <Leaflet latitude={latitude} longitude={longitude}></Leaflet>
          ) : (
            <div>erreur recuperation des données de localisation</div>
          )}
        </div>
        {/* ------- FIN DE LA CARTE  */}

        <div className="reviews"></div>
      </div>
    );
  };

  //  RENDRE LES DONNÉES VISIBLES PAR L'UTILISATEUR POUR LES REVIEWS
  const renderMyReview = () => {
    // myReview.splice(6);

    return reviewVariable.map((element, index) => {
      return (
        <div key={index}>
          {console.log("review 2")}
          <Review
            comment={element.comment}
            // created_at={element.created_at}
            created_at={
              new Date(element.created_at).toLocaleDateString("fr", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }) +
              " | " +
              new Date(element.created_at).toLocaleTimeString("fr", {
                hour: "numeric",
                minute: "numeric",
              })
            }
            rate={element.rate}
            reviewId={element.id}
            user_id={element.user_id}
            file_review={element.file_review}
          />
        </div>
      );
    });
  };

  return (
    <>
      {/* SECTION HEADER - START */}
      <div className="navbar">
        <Navbar />
      </div>
      {/* SECTION HEADER - END */}

      {/* SECTION SHOWPLACE - START */}
      <div>{renderPlace()}</div>
      {/* SECTION SHOWPLACE - END */}

      {/* SECTION RENDERREVIEW - START */}
      {user.role === "membre" && (
        <div>
          <CreateReview />
        </div>
      )}
      {/* SECTION RENDERREVIEW - END */}

      {/* SECTION SHOWPLACE - START */}
      <section className="renderReview">{renderMyReview()}</section>
      {/* SECTION SHOWPLACE - END */}
    </>
  );
}

export default Show;
