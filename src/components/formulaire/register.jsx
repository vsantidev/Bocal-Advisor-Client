import { useState } from "react";

function Register() {
    const [role, setRole] = useState('membre');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [birthday, setBirhday] = useState('');
    const [password, setPassword] = useState('');
    let user = {firstname,lastname, email, password , username, birthday, role };
    
    
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

    function choiceInscription($choice){
        if ($choice == "gerant") {
            console.log('gerant');
            setRole('gerant');
        } else {
            console.log('membre');
            setRole('membre');
        }
    }



    return (
        <div className="formInscription">

            <div>
                <p onClick={() => choiceInscription('membre')}>membre</p>
                <p onClick={() => choiceInscription('gerant')}>gerant</p>
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
    )
}

export default Register;


