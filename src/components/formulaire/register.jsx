import { useState } from "react";
import Navbar from "../../layouts/navbar";
import "./register.css"

function Register() {
    const [role, setRole] = useState('membre');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [birthday, setBirhday] = useState('');
    const [password, setPassword] = useState('');
    let user = {firstname,lastname, email, password , username, birthday, role };
    let membre_btn = document.querySelector(".membre-btn");
    let gerant_btn = document.querySelector('.gerant-btn');

    
    const handleRegister = async (e) => {
        e.preventDefault();
        
        let options = { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        };

        await fetch("http://127.0.0.1:8000/api/register", options)
            .then((response) => response.json())
            .then((data) => {
            console.log("data",data);
            
            if (data.token) {
                alert(data.message);
            } else {
                alert("TRY AGAIN");
            }
        });
    }


    console.log("ll ",membre_btn);

    function choiceInscription($choice){
        if ($choice == "gerant") {
            console.log('gerant');
            setRole('gerant'); 
            
            gerant_btn.style.backgroundColor = "green";
            gerant_btn.style.color ="white"

            membre_btn.style.backgroundColor = "white";
            membre_btn.style.color ="green";

        } else {
            console.log('membre');
            setRole('membre');
            
            gerant_btn.style.backgroundColor = "white";
            gerant_btn.style.color ="green"

            membre_btn.style.backgroundColor = "green";
            membre_btn.style.color ="white";
        }
    }



    return (
        <div className="auth">
            <div className="navContainer">
                <Navbar />
            </div>

            <div className="formRegister">
                <div className="choice-btn">
                    <p className="membre-btn" onClick={() => choiceInscription('membre')}>membre</p>
                    <p className="gerant-btn" onClick={() => choiceInscription('gerant')}>gerant</p>
                </div>

                {/* {console.log("hello : "+ role)} */}
                <form action="" method="POST">
                    <input type="text" name="lastname" placeholder="nom" required onChange={(e) => setLastname(e.target.value)}/>
                    <input type="text" name="firstname" placeholder="prenom" required onChange={(e) => setFirstname(e.target.value)}/>
                    <input type="email" name="email" placeholder="email" required onChange={(e) => setEmail(e.target.value)}/>
                    <input type="text" name="username" placeholder="pseudo" required onChange={(e) => setUsername(e.target.value)}/>
                    <input type="text" name="birthday" placeholder="date d'anniversaire" required onChange={(e) => setBirhday(e.target.value)}/>
                    <input type="password" name="password" placeholder="mot de passe" required onChange={(e) => setPassword(e.target.value)}/>

                    <button type="submit" onClick={handleRegister} >valider</button>
                </form>
                <a href="">Déja un compte ?</a>
            </div>
        </div>

    )
}

export default Register;


