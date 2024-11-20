import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs';
import myAxios from "../services/myAxios";
import "./AuthModal.css";

function Register() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    const users = useLoaderData();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const listUsers = users[1]

        // je vérifie que l'email saisi n'est pas déjà en base
        const userAlreadyExist = listUsers.find(user => 
            user.email === formData.email
        );
        try {
            // si email conforme : inscription
            if (!userAlreadyExist) {
                const hashedPassword = bcrypt.hashSync(formData.password, 10); // 10 est le "salt rounds"
                const response = await myAxios.post("/api/users", {email: formData.email, password: hashedPassword});

                if (response && response.data.insertId) {
                    localStorage.setItem(
                        'myUser', 
                        JSON.stringify({id: response.data.insertId, email: formData.email, password: hashedPassword})
                    );
                    navigate("/userprofile")
                }
            } else {
                setError("Cet email est déjà associé à un compte. Veuillez vérifier vos informations.");
            }
        }
        catch (error) {
            console.error("Erreur lors de l'inscription", error);
            toast.error("Une erreur est survenue lors de l'inscription !");
        }
    };

    return (
        <div>
            <h3>Inscription</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        name="email"
                        type="email"
                        placeholder="E-mail" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <input
                        name="password"
                        type="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="button-2" type="submit">S'inscrire</button>
            </form>
            <p>Déjà inscrit ?</p>
            <ToastContainer />
        </div>
    );
}

export default Register;
