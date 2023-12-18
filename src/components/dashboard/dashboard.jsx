import { useEffect, useState } from "react";
import CreatePlaces from "../Places/CreatePLaces";
import './profile.css';

function Dashboard() {

    const [user, setUser] = useState({});
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null);

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
  }, []);

  const ModifProfil = async () => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("@TokenUser"),
        },
        body: JSON.stringify(user),
      };

      const response = await fetch(
        "http://127.0.0.1:8000/api/dashboard",
        options
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.success);
      } else {
        setError("Failed to update user data.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleSave = () =>{
    ModifProfil();
    setEditing(false);
  }

  const renderContentBasedOnRole = () => {
    if (user.role === 'gerant') {
      return (
          <>
      <h1>"{user.role}" Profil</h1>
      {editing ? (
        <div className="identity">
          <div className="getFirstName">
          Nom: {" "}
          <input type="text"
          value={user.firstname}
          className="changeProfil"
          onChange={(e) => setUser({...user, firstname: e.target.value})} />
          </div>

          <div className="getLastName">
          Prénom: {" "}
          <input type="text"
          value={user.lastname}
          className="changeProfil"
          onChange={(e) => setUser({...user, lastname: e.target.value})} />
          </div>

          <div className="getUsername">
            Pseudo: {" "}
            <input type="text"
            value={user.pseudo}
            className="changeProfil"
            onChange={(e) => setUser({...user, username: e.target.value})} />
          </div>

          <div className="getPassword">
            Mot de passe: {" "}
            <input type="text"
            value={user.password}
            className="changeProfil"
            onChange={(e) => setUser({...user, password: e.target.value})} />
          </div>

          <button onClick={handleSave} className="saveButton">
            Sauvegarder
          </button>

          <button onClick={() => setEditing(false)} className="cancelButton">
            Annuler
          </button>
        </div>
      ) : (
        <div className="identity">
            <p>{user.firstname}</p>
            <p>{user.lastname}</p>
            <p>{user.birthday}</p>
            <p>{user.pseudo}</p>
            <p>Email:{user.email}</p>
            <p><span>password : ••••••••••• </span></p>
          <button onClick={() => setEditing(true)} className="editButton">
            Modifier
          </button>
        </div>
      )}
       </>
        );
    } else if (user.role === 'membre') {
      return (
        <>
        <h1>"{user.role}" Profil</h1>
        {editing ? (
          <div className="identity">
            <div className="getFirstName">
            Nom: {" "}
            <input type="text"
            value={user.firstname}
            className="changeProfil"
            onChange={(e) => setUser({...user, firstname: e.target.value})} />
            </div>
  
            <div className="getLastName">
            Prénom: {" "}
            <input type="text"
            value={user.lastname}
            className="changeProfil"
            onChange={(e) => setUser({...user, lastname: e.target.value})} />
            </div>
  
            <div className="getUsername">
              Pseudo: {" "}
              <input type="text"
              value={user.pseudo}
              className="changeProfil"
              onChange={(e) => setUser({...user, username: e.target.value})} />
            </div>
  
            <div className="getPassword">
              Mot de passe: {" "}
              <input type="text"
              value={user.password}
              className="changeProfil"
              onChange={(e) => setUser({...user, password: e.target.value})} />
            </div>

            <button onClick={handleSave} className="saveButton">
            Sauvegarder
            </button>
  
            <button onClick={() => setEditing(false)} className="cancelButton">
              Annuler
            </button>
          </div>
        ) : (
          <div className="identity">
              <span>{user.firstname}</span><br />
              <span>{user.lastname}</span><br />
              <span>{user.birthday}</span><br />
              <span>{user.pseudo}</span><br />
              <span>Email:{user.email}</span><br />
              <span>password :••••••••••• </span><br />
            <button onClick={() => setEditing(true)} className="editButton">
              Modifier
            </button>
          </div>
        )}
         </>
      );
    } else {
      return <div>Rôle non reconnu</div>;
    }
  };

  return (
    <>

      <div>
      {renderContentBasedOnRole()}
      </div>

      <div>
      {user.role === 'gerant' && <CreatePlaces/>}
      </div>
        
    </>
  );
};

export default Dashboard;
