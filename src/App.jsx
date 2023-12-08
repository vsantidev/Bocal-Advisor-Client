import { useState } from 'react'
import './App.css'
import Register from './components/formulaire/register'

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
      {Register()}
    </>
  );
}

export default App;
