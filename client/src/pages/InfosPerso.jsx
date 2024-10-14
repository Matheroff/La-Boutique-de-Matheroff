import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./InfosPerso.css";
import Footer from "../components/Footer";

function InfosPerso() {

    const navigate = useNavigate();

    const handleKeyDown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        navigate();
      }
    };
  
    const [formData, setFormData] = useState({
      civilite: "",
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      pays: "",
      adresse: "",
      ville: "",
      codePostal: "",
      motDePasse: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
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
                <p
                  type="button"
                  onClick={() => navigate("/")}
                  aria-hidden="true"
                  onKeyUp={handleKeyDown}
                >
                    Accueil ≻
                </p>
                <p
                  type="button"
                  onClick={() => navigate("/")}
                  aria-hidden="true"
                    onKeyUp={handleKeyDown}
                >
                  Mon profil ≻
                </p>
                <p>Informations personnelles</p>
          </section>
          <section className="user-infos">
            <h3>Mes informations personnelles</h3>
            <form className="form-informations" onSubmit={handleSubmit}>
              <p>Les champs avec un * sont obligatoires</p>
              <select
                name="civilite"
                value={formData.civilite}
                onChange={handleChange}
              >
                <option value="">Civilité</option>
                <option value="Madame">Madame</option>
                <option value="Monsieur">Monsieur</option>
              </select>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Nom*"
              />
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Prénom*"
              />
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="Téléphone*"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail*"
              />
              <input
                type="text"
                name="pays"
                value={formData.pays}
                onChange={handleChange}
                placeholder="Pays*"
              />
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                placeholder="Adresse*"
              />
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                placeholder="Ville*"
              />
              <input
                type="text"
                name="codePostal"
                value={formData.codePostal}
                onChange={handleChange}
                placeholder="Code Postal*"
              />
              <button 
                type="submit"
                onKeyUp={handleKeyDown}
              >
                Enregistrer
              </button>
              <h3>Mon mot de passe</h3>
              <input
                type="password"
                name="motDePasse"
                value={formData.motDePasseActuel}
                onChange={handleChange}
                placeholder="Mot de passe actuel"
              />
              <input
                type="password"
                name="motDePasse"
                value={formData.nouveauMotDePasse}
                onChange={handleChange}
                placeholder="Nouveau mot de passe"
              />
              <input
                type="password"
                name="motDePasse"
                value={formData.confirmerMotDePasse}
                onChange={handleChange}
                placeholder="Confirmer le nouveau mot de passe"
              />
              <button
                type="submit"
                onKeyUp={handleKeyDown}
              >
                Enregistrer
              </button>
            </form>
            <div className="order">
              <button
                alt="Commandes"
                type="button"
                onClick={() => navigate("/orders")}
                onKeyUp={handleKeyDown}
              >
                Voir mes commandes et factures
              </button>
            </div>
        </section>
        <Footer />
      </div>
    );
  }

export default InfosPerso;