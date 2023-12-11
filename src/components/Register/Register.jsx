import { useState } from "react";

import "./register.css";

import Navbar from "../../layouts/navbar/Navbar";
import Login from "../login/login";

function Register() {
  const [role, setRole] = useState("membre");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirhday] = useState("");
  const [password, setPassword] = useState("");
  let user = { firstname, lastname, email, password, username, birthday, role };


  const handleRegister = async (e) => {
    console.log("fonc: " , user);
    e.preventDefault();

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

      
    fetch("http://127.0.0.1:8000/api/register", options)
      .then(async response => {
        response.json()
        if (!response.ok){
          throw new Error(`${response.status} ${response.statusText}`);
        }
        
      })
      .then(data => {
        console.log("data", data);

        if (data.token) {
          alert(data.message);
        } else {
          alert("TRY AGAIN");
        }
      })
      .catch(error => {
        console.error('There was an error : ', error);
      });
  };

  function choiceInscription($choice) {
    let membre_btn = document.querySelector(".membre-btn");
    let gerant_btn = document.querySelector(".gerant-btn");
    
    if ($choice == "gerant") {
      console.log("gerant");
      setRole("gerant");

      gerant_btn.classList.add('active');
      membre_btn.classList.remove('active');
    } else {
      console.log("membre");
      setRole("membre");

      gerant_btn.classList.remove('active');
      membre_btn.classList.add('active');
    }
  }

  return (
    <div className="auth">
      <div className="navContainer">
        <div className="navbar">
          <Navbar />
        </div>
      </div>

      <div className="formRegister">
        <div className="choice-btn">
          <p className="membre-btn active" onClick={() => choiceInscription("membre")}>
            membre
          </p>
          <p className="gerant-btn" onClick={() => choiceInscription("gerant")}>
            gerant
          </p>
        </div>

        <form action="" method="POST">
          <input
            type="text"
            name="lastname"
            placeholder="nom"
            required
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="text"
            name="firstname"
            placeholder="prenom"
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="username"
            placeholder="pseudo"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            name="birthday"
            placeholder="date d'anniversaire yyyy/mm/dd"
            required
            onChange={(e) => setBirhday(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="mot de passe"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={handleRegister}>
            valider
          </button>
        </form>
        <a href="Login">Déja un compte ?</a>
      </div>
    </div>
  );
}

export default Register;
