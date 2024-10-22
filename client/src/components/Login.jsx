import { useState } from "react";
import { useNavigate } from "react-router-dom";
import myAxios from "../services/myAxios";
import "./AuthModal.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await myAxios.post(`/login`, { email, password });
            
            if (response.data.token) {
                // Stocker le token dans le localStorage pour les requêtes futures
                localStorage.setItem("token", response.data.token);
                // Rediriger vers le profil utilisateur après connexion réussie
                navigate("/userprofile");
            } else {
                setError("Échec de la connexion. Veuillez vérifier vos informations.");
            }
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
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Mot de passe"  
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;

