import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Review from "../review/Review";
import RenderReview from "../review/RenderReview";
import CreateReview from "../review/CreateReview";
import Navbar from "../../layouts/navbar/Navbar";

function Show({ placeId }) {
  const [user, setUser] = useState({});
  const [place, setPlace] = useState("null");
  const [review, setReview] = useState ([]);
  const [error, setError] = useState(null);
  const value = useLocation().state;
  console.log("loc", value);
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

      // console.log("data", data.place);
      // console.log("review : ",data.review);
      setPlace(data.place);
      setReview(data.review);
      // if (data) {
      //  alert(data.message);
      // } else {
      //  alert("TRY AGAIN");
      // }

    } catch (error) {
      console.error("Fetch error:", error);
    }
  };


  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem('@TokenUser'); 

        if (!token) {
          setError('Token not found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.success); 
        } else {
          setError('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      }
    };

    getUserProfile();
    handleShow();
  }, [placeId]);

  const renderPlace = () => {
    return (
      <div>
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
                  />
              </div>
          );
      });
  };


  return(
  <>
    <div className="navbar"><Navbar /></div>
    <div>{renderPlace()}</div>
    {user.role === 'membre' && <div><CreateReview /></div>}
    <div>{renderMyReview()}</div>
  </>
  );
}

export default Show;
