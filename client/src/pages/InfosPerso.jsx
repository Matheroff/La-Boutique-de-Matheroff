import { Link } from "react-router-dom";
import { useState } from "react";
import "./InfosPerso.css";
import Footer from "../components/Footer";

function InfosPerso() {
  
    const [formData, setFormData] = useState({
      civility: "",
      lastname: "",
      firstname: "",
      email: "",
      phone_number: "",
      adress: "",
      postal_code: "",
      city: "",
      country: "",
      password: "",
    });
    
    const myUser = JSON.parse(localStorage.getItem("myUser"));
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.info("Form Data Submitted:", formData);
    };
  
    return (
      <div>
        <section className="fil-ariane">
          <Link to="/">
            <p type="button">Accueil ≻</p>
          </Link>
          <Link to="/userprofile">
            <p type="button">Mon profil ≻</p>
          </Link>
          <p>Informations personnelles</p>
        </section>
        <section className="user-infos">
          <h3>Mes informations</h3>
          <form className="form-informations" onSubmit={handleSubmit}>
            <p>Les champs avec un * sont obligatoires</p>
            <select
              name="civility"
              value={formData.civility}
            >
              <option value="">Civilité</option>
              <option value="Madame">Madame</option>
              <option value="Monsieur">Monsieur</option>
            </select>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Nom*"
            />
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Prénom*"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail*"
            />
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Téléphone*"
            />
            <input
              type="text"
              name="adress"
              value={formData.adress}
              onChange={handleChange}
              placeholder="Adresse*"
            />
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              placeholder="Code Postal*"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ville*"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Pays*"
            />
            <button type="submit">Enregistrer</button>
            <h3>Mon mot de passe</h3>
            <input
              type="password"
              name="password"
              value={formData.currentpassword}
              onChange={handleChange}
              placeholder="Mot de passe actuel"
            />
            <input
              type="password"
              name="motDePasse"
              value={formData.newpassword}
              onChange={handleChange}
              placeholder="Nouveau mot de passe"
            />
            <input
              type="password"
              name="motDePasse"
              value={formData.confirmnewpassword}
              onChange={handleChange}
              placeholder="Confirmer le nouveau mot de passe"
            />
            <button type="submit">Enregistrer</button>
          </form>
          <div className="order">
            <Link to="/orders">
              <button
                className="button-2"
                alt="Commandes"
                type="button"
              >
                Voir mes commandes et factures
              </button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

export default InfosPerso;