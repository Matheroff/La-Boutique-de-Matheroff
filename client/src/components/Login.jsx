import { useState } from "react";
import "./AuthModal.css";
// import myAxios from "../services/myAxios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // const response = await myAxios.get(`/login`, {email, password});
            // return response.data;
            // if (response.token) {
            //     localStorage.setItem("token", response.token);
            //     navigate("/userprofile")
            // } else {
            //     setError("Erreur lors de la connexion");
            // }
        } catch (err) {
            setError("Erreur lors de la connexion. Vérifiez vos informations.");
        }
      };

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="E-mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} required 
                />
                <input 
                    type="password" 
                    placeholder="Mot de passe"  
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} required 
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
