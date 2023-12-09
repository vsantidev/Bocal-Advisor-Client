import { useState } from "react";
import App from "../../App";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  //   const navigate = useNavigate();
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", options);
      const data = await response.json();
      if (data) {
        localStorage.setItem("@TokenUser", data.token);
        setShowSuccessAlert(true);
        alert("Vous êtes connecté(e)");
        setTimeout(() => {
          setShowSuccessAlert(false);
          //   navigate("/");
        }, 2000);
      } else {
        setShowErrorAlert(true);
        alert("La connexion a échoué");
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 5000);
        setError(data.message || "Une erreur s'est produite.");
      }
    } catch (error) {
      setError("Une erreur s'est produite lors de la connexion.");
    }
  };

  return (
    <>
      <div>
        <form action="" method="post">
          <input
            type="text"
            value={email}
            onChange={handleInputEmail}
            placeholder="Email"
          />
          <label>{emailError}</label>
          <input
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={handleInputPassword}
            placeholder="Mot de Passe"
          />
          <label>
            <input
              type="checkbox"
              className="checkbox"
              onClick={() => setShowPassword(!showPassword)}
            />
            Afficher le mot de passe
          </label>
          <label>{passwordError}</label>
          <div className={"inputContainer"}>
            <input
              className={"inputButton"}
              type="button"
              onClick={getLogin}
              value={"Connexion"}
              id="loginButton"
            />
          </div>
          <div className="noAccountContainer">
            <div>Vous n'avez pas encore de compte ?</div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
