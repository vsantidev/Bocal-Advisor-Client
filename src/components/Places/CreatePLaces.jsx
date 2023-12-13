import { useState } from "react";

function CreatePlaces() {
  const [title, setTitle] = useState("membre");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const handlePlaces = async (e) => {
    e.preventDefault();

    // Créé un nouvel objet formData qui paire les champs du formulaire et leurs valeurs
    const formData = new FormData();
    // Ajoute les paires suivantes dans formData
    formData.append("title", title);
    formData.append("street", street);
    formData.append("postcode", postcode);
    formData.append("city", city);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("file", file);

    console.log(title);
    let options = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/place", options);
      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data", data);
      if (data) {
        alert(data.message);
      } else {
        alert("TRY AGAIN");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Fonction qui récupère la catégorie
  function cat($category) {
    if ($category == "Hôtel") {
      console.log("Hôtel");
      setCategory("1");
    } else if ($category == "Restaurant") {
      console.log("Restaurant");
      setCategory("2");
    } else if ($category == "Bar") {
      console.log("Bar");
      setCategory("3");
    } else if ($category == "Musées") {
      console.log("Musées");
      setCategory("4");
    } else if ($category == "Activités") {
      console.log("Activités");
      setCategory("5");
    }
  }

  return (
    <>
      <div className="form">
        <form action="" method="POST">
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="street"
            placeholder="street"
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            type="text"
            name="postcode"
            placeholder="postcode"
            onChange={(e) => setPostcode(e.target.value)}
          />
          <input
            type="text"
            name="city"
            placeholder="city"
            onChange={(e) => setCity(e.target.value)}
          />

          <span
            style={{ backgroundColor: "aqua", padding: 2 }}
            value="Hotel"
            onClick={() => cat("Hôtel")}
          >
            Hôtel
          </span>
          <span
            style={{ backgroundColor: "purple", padding: 2 }}
            value=">Restaurant"
            onClick={() => cat("Restaurant")}
          >
            Restaurant
          </span>
          <span
            style={{ backgroundColor: "brown", padding: 2 }}
            value="Bar"
            onClick={() => cat("Bar")}
          >
            Bar
          </span>
          <span
            style={{ backgroundColor: "grey", padding: 2 }}
            value="Musées"
            onClick={() => cat("Musées")}
          >
            Musées
          </span>
          <span
            style={{ backgroundColor: "orange", padding: 2 }}
            value="Activités"
            onClick={() => cat("Activités")}
          >
            Activités
          </span>

          <input
            type="text"
            name="description"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit" onClick={handlePlaces}>
            Créer
          </button>
        </form>
      </div>
    </>
  );
}

export default CreatePlaces;
