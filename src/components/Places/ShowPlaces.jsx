import { useState, useEffect } from "react";
import Places from "./Places";
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
          <Places
            title={element.title}
            street={element.street}
            postcode={element.postcode}
            city={element.city}
            category={element.category}
            file={element.file}
            name_category={element.name_category}
          />
        </ul>
      </div>
    );
  };

  return <div>{renderPlace()}</div>;
}

export default Show;
