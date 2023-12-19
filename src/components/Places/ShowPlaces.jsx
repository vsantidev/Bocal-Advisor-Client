import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import Review from "../review/Review";
import RenderReview from "../review/RenderReview";
import CreateReview from "../review/CreateReview";
import Navbar from "../../layouts/navbar/Navbar";

function Show({ placeId }) {
  const [place, setPlace] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [review, setReview] = useState([]);
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

      setPlace(data.place);
      setReview(data.review);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected File:", file);
    setPlace((prevPlace) => ({
      ...prevPlace,
      file: file,
    }));
  };

  const editPlace = async (placeId) => {
    const formData = new FormData();
    formData.append("title", place.title);
    formData.append("street", place.street);
    formData.append("postcode", place.postcode);
    formData.append("description", place.description);
    formData.append("city", place.city);
    formData.append("description", place.street);
    formData.append("file", place.file);

    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/edit/${placeId}`,
        options
      );
      if (!response.ok) {
        console.log(response);

        alert(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSave = () => {
    editPlace(value);
    setIsEditing(false);
  };

  useEffect(() => {
    handleShow();
  }, [placeId]);

  const renderPlace = () => {
    return (
      <div>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={place.title}
              onChange={(e) => setPlace({ ...place, title: e.target.value })}
            />
            <input
              type="text"
              value={place.street}
              onChange={(e) => setPlace({ ...place, street: e.target.value })}
            />
            <input
              type="number"
              value={place.postcode}
              onChange={(e) => setPlace({ ...place, postcode: e.target.value })}
            />
            <input
              type="text"
              value={place.city}
              onChange={(e) => setPlace({ ...place, city: e.target.value })}
            />
            <input type="file" onChange={(e) => handleFileChange(e)} />
            <input
              type="text"
              value={place.description}
              onChange={(e) =>
                setPlace({ ...place, description: e.target.value })
              }
            />
            <input
              type="number"
              value={place.name_category}
              onChange={(e) =>
                setPlace({ ...place, name_category: e.target.value })
              }
            />

            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Annuler</button>
          </div>
        ) : (
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
            <button onClick={() => setIsEditing(true)}>Modif</button>
          </ul>
        )}
      </div>
    );
  };

  //  RENDRE LES DONNÉES VISIBLES PAR L'UTILISATEUR POUR LES REVIEWS
  const renderMyReview = () => {
    // myReview.splice(6);
    return review.map((element, index) => {
      return (
        <div key={index}>
          <Review comment={element.comment} rate={element.rate} />
        </div>
      );
    });
  };

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div>{renderPlace()}</div>
      <div>
        <CreateReview />
      </div>
      <div>{renderMyReview()}</div>
    </>
  );
}

export default Show;
