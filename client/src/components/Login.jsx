import { useState } from "react";
import myAxios from "../services/myAxios";
import "./AuthModal.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await myAxios.post("/api/login", { email, password }); // Assurez-vous que les champs correspondent
            console.info("Connexion réussie :", response.data);
            // Stocker le token si nécessaire et rediriger
        } catch (err) {
            setError("Erreur lors de la connexion. Vérifiez vos informations.");
            console.error(err);
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

