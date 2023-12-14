import { useState, useEffect } from "react";
import { useLocation } from "react-router";

function Show({ placeId }) {
  const [place, setPlace] = useState("null");
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

  return <div>{renderPlace()}</div>;
}

export default Show;
