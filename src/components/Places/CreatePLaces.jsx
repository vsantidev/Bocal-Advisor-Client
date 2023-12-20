import { useEffect, useState } from "react";
import Select from 'react-select';

function CreatePlaces() {
  const [title, setTitle] = useState("membre");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  // const [adresse, setAdresse] = useState("");

  // const[x, setX] = useState();
  // const[y, setY] = useState();

  // récupere les catégorie de la bdd
  const[categories, setCategories] = useState([]);
  // les categories choisie
  const[selectOptions, setselectOptions] = useState([]);

  //all categories choisi
  const[userChoice, setUserChoice] = useState([])
 
  // restructure le tableau pour le select
  const opt = () => {
      categories.forEach(element => {

        element.forEach(item => {
        
          setselectOptions(selectOptions =>[...selectOptions, {'value': item.id, 'label': item.name_category} ])

        });
        
      });


  }
  console.log("test", selectOptions);
  // select
  const MyComponent = () => (
    <Select 
      defaultValue={[selectOptions[0]]}
      isMulti
      name="colors"
      options={selectOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={(choices) => setUserChoice(choices.map(choice => (choice.value)))}
    />
  )

    


  // creation des places
  const handlePlaces = async (e) => {
    e.preventDefault();

    
    // let optionsAdresse = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    // const api = await fetch("https://api-adresse.data.gouv.fr/search/?q="+adresse, optionsAdresse);
    // const dataApi = await api.json();
    // console.log("data api", dataApi.features[0].geometry.coordinates[1]);
    // setX(dataApi.features[0].geometry.coordinates[0]);
    // setY(dataApi.features[0].geometry.coordinates[1])

    // Créé un nouvel objet formData qui paire les champs du formulaire et leurs valeurs
    const formData = new FormData();
    // Ajoute les paires suivantes dans formData
    formData.append("title", title);
    formData.append("street", street);
    formData.append("postcode", postcode);
    formData.append("city", city);
    formData.append("category", userChoice);
    formData.append("description", description);
    formData.append("file", file);
/*     formData.append("x", x);
    formData.append("y", y); */



    
    let options = {
      method: "POST",
      /* headers: {'Content-Type': 'application/json'}, */
/*       body: JSON.stringify([{
        title: title,
        street: street,
        postcode: postcode,
        city: city,
        category: userChoice,
        description: description,
      }]), */
      body : formData,

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

  // recuperation des categories
  const getCategories = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`http://127.0.0.1:8000/api/index`, options);
      const data = await response.json();

      // Vérifions si le premier élément de data est bien un tableau
      if (Array.isArray(data/* ["0"] */)) {
        // Si oui, places prend la valeur de celui-ci
        setCategories(data);
      } else {
        // Si non, erreur
        console.error("Pas un tableau:", data);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);


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
          {selectOptions.length == 0 ? opt() : console.log('deja plein')}
          {MyComponent()}

{/*           <span
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
 */}
          <input
            type="text"
            name="description"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />

{/*           <input 
            type="text" 
            name="adresse"
            placeholder="adresse du lieux"
            onChange={(e) => setAdresse(e.target.value)}
          />   */}
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
