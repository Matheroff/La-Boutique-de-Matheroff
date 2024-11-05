import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";
import "./AuthModal.css";
// import _ from 'lodash';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState("");
    const users = useLoaderData();
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const listUsers = users[1]

        // console.log('----------------------------------------------------------')
        // console.log(formData)
        // console.log(listUsers)

        // je vérifie que mon formData est exact par rapport aux données d'au moins un de mes users
        const myUser = listUsers.find(user => 
            user.email === formData.email && user.password === formData.password
        );

        if (myUser) {
            localStorage.setItem('myUser', JSON.stringify(myUser));
            navigate("/userprofile");
        } else {
            setError("Erreur lors de la connexion. Vérifiez vos informations.");
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

