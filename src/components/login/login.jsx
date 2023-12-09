import { useState } from "react";
import App from "../../App"
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../layouts/navbar/Navbar";
import "../formulaire/register.css";
import Register from "../formulaire/register";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleInputEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleInputPassword = (e) => {
        setPassword(e.target.value);
    };

    const getLogin = async (e) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");

        let options = {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };

        try{
            const response = await fetch("http://127.0.0.1:8000/api/login", options);
            const data = await response.json();
            if (data) {
                localStorage.setItem("@TokenUser", data.token);
                setShowSuccessAlert(true);
                alert("Vous etes connecter!!!!!!");
                setTimeout(() => {
                    setShowSuccessAlert(false);
                    navigate("/");
                }, 2000);
            }else{
                setShowErrorAlert(true);
                alert("Vous etes pas connecter!!!!!!");
                setTimeout(() => {
                    setShowErrorAlert(false);
                }, 5000);
                setError(data.message || "Une erreur s'est produite.");
            }
        }catch(error) {
            setError("Une erreur s'est produite lors de la connexion.");
        }
    };

    return(
        <div className="auth">
            <div className="navContainer">
                <div className="navbar">
                    <Navbar />
                </div>
            </div>
            
            <div className="formRegister">
                <form action="" method="post">
                    <input type="text" value={email} onChange={handleInputEmail} placeholder="Email"/>
                    <label>{emailError}</label>
                    <input value={password} type={showPassword ? "text" : "password"} onChange={handleInputPassword} placeholder="Mot de Passe"/>
                    <label>
                        <input type="checkbox" className="checkbox" onClick={() => setShowPassword(!showPassword)} />
                        Afficher le mot de passe
                    </label>
                    <label>{passwordError}</label>

                    <div className={"inputContainer"}>
                        <button className={"inputButton"} type="button" onClick={getLogin} value={"Connexion"} id="loginButton" >Connexion</button>
                    </div>
                    
                    <div className="noAccountContainer">
                        <div>
                            <a href="Register">Vous n'avez pas encore de compte ?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
