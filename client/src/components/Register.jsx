import { useState } from "react";
import { useNavigate } from "react-router-dom";
import myAxios from "../services/myAxios";
import "./AuthModal.css";

function Register() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // const response = await myAxios.post("/api/user", { email, password });
            const response = await myAxios.post("/api/user", formData);
            navigate("/userprofile");
            
            if (response.data.success) {
                // Peut-être rediriger vers la page de connexion ou de profil
                navigate("/login");
            } else {
                setError("Erreur lors de l'inscription. Veuillez réessayer.");
            }
        } catch (err) {
            setError("Erreur lors de l'inscription. Vérifiez vos informations.");
        }
    };

    return (
        <div>
            <h3>Inscription</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <div>
                    <input 
                        type="email"
                        placeholder="E-mail" 
                        value={formData.email} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value})} 
                        required 
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value})}
                        required
                    />
                </div>
                <button type="submit">S'inscrire</button>
            </form>
            <p>Déjà inscrit ?</p>
        </div>
    );
}

export default Register;
