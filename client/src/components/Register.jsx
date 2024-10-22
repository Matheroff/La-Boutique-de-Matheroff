import { useState } from "react";
import "./AuthModal.css";
// import myAxios from "../services/myAxios";

function Register() {
    // const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        // try {
        //     const response = await myAxios.post(`/register`, {username, email, password});
        //     return response.data;
        // } catch (err) {
        //     setError("Erreur lors de l'inscription. Vérifiez vos informations.");
        //     console.error(err);
        // }
    };

    return (
        <div>
            <h3>Inscription</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <div>
                    <input
                        type="text"
                        placeholder="Pseudo"
                        // onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input 
                        type="email"
                        placeholder="E-mail" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        // onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">S'inscrire</button>
            </form>
            <p>Déjà inscrit ?</p>
        </div>
    );
};

export default Register;
