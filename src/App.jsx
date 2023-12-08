import { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [role, setRole] = useState("");
  let user = { firstname, lastname, email, password, username, birthday, role };

  const handleRegister = async (e) => {
    e.preventDefault();

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    await fetch(`http://127.0.0.1:8000/api/register`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          alert(data.message);
        } else {
          alert("TRY AGAIN");
        }
      });
  };

  return (
    <>
      <div>
        <form method="POST">
          <input
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            name="firstname"
          />
          <input
            onChange={(e) => setLastname(e.target.value)}
            type="text"
            name="lastname"
            placeholder="Nom"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Mot de passe"
          />
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
          />
          <input
            onChange={(e) => setBirthday(e.target.value)}
            type="text"
            name="birthday"
            placeholder="Date de naissance"
          />
          <input
            onChange={(e) => setRole(e.target.value)}
            type="text"
            name="role"
            placeholder="Membre ou Gérant"
          />

          <button onClick={handleRegister} className="submit">
            Valider
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
