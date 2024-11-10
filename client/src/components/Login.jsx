import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";
import bcrypt from 'bcryptjs';
import "./AuthModal.css";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState("");
    const users = useLoaderData();  // Les utilisateurs récupérés via le loader
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Vérifier si l'utilisateur existe dans la liste récupérée via useLoaderData
        const myUser = users[1].find(user => user.email === formData.email);

        if (myUser) {
            const isPasswordValid = bcrypt.compareSync(formData.password, myUser.password);
            if (isPasswordValid) {
                // Sauvegarder l'utilisateur dans le localStorage
                localStorage.setItem('myUser', JSON.stringify(myUser));
                navigate("/userprofile");
                window.location.reload();
            } else {
                setError("Erreur lors de la connexion. Vérifiez vos informations.");
            }
        } else {
            setError("Utilisateur introuvable.");
        }
    };

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="text" 
                    placeholder="E-mail" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                />
                <input
                    name="password"
                    type="password" 
                    placeholder="Mot de passe"  
                    value={formData.password}
                    onChange={handleChange} 
                    required 
                />
                <button className="button-2" type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;

