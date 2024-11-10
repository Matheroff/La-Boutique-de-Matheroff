import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer";
import myAxios from "../services/myAxios";
import "./InfosPerso.css";
import bcrypt from 'bcryptjs';

function InfosPerso() {

  const myUser = JSON.parse(localStorage.getItem("myUser"));
  
  const [formData, setFormData] = useState({
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

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    confirmNewPassword: ""
  });

  // Charger les informations de l'utilisateur connecté depuis la base de données
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await myAxios.get(`/api/users/${myUser.id}`);
        setFormData({
          lastname: response.data.lastname,
          firstname: response.data.firstname,
          email: response.data.email,
          phone_number: response.data.phone_number,
          adress: response.data.adress,
          postal_code: response.data.postal_code,
          city: response.data.city,
          country: response.data.country,
          password: ""
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    };

    fetchUserData();
  }, []);

// Gérer les changements de chaque champ de formulaire
const handleChange = (e) => {
  const { name, value } = e.target;

  // Vérifier si le champ est un champ de mot de passe
  if (name === "currentPassword" || name === "confirmNewPassword") {
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};

  // Envoyer les données du formulaire à la base de données
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await myAxios.put(`/api/users/${myUser.id}`, {...formData, password: myUser.password});
      
      toast.success("Les informations ont été mises à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations :", error);
      toast.error("Une erreur est survenue lors de la mise à jour des informations.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
      // Vérifier que tous les champs sont remplis
      if (!passwordData.currentPassword || !formData.password || !passwordData.confirmNewPassword) {
        toast.error("Tous les champs de mot de passe doivent être remplis.");
        return;
      }

      const isCurrentPasswordValid = bcrypt.compareSync(passwordData.currentPassword, myUser.password);

      // Vérifier que le champ "mot de passe actuel" corresponde au mot de passe de la BDD
      if (!isCurrentPasswordValid) {
        toast.error("Le mot de passe actuel renseigné ne correspond pas.");
        return;
      }
    
      // Vérifier que les nouveaux mots de passe correspondent
      if (formData.password !== passwordData.confirmNewPassword) {
        toast.error("Le nouveau mot de passe et la confirmation ne correspondent pas.");
        return;
      }

    try {
      const hashedPassword = bcrypt.hashSync(formData.password, 10);
      await myAxios.put(`/api/users/${myUser.id}`, {...formData, password: hashedPassword});
      localStorage.setItem("myUser", JSON.stringify({ ...myUser, password: hashedPassword }));
      toast.success("Les informations ont été mises à jour avec succès !");
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations :", error);
      toast.error("Une erreur est survenue lors de la mise à jour des informations.");
    }
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
      <Link to="/orders">
        <button
          className="button-2"
          alt="Commandes"
          type="button"
        >
          Voir mes commandes et factures
        </button>
      </Link>
      </section>
      <section className="forms-flex">
        <div>
          <form className="form-informations" onSubmit={handleSubmit}>
            <p>Les champs avec un * sont obligatoires <br/>afin d'assurer le bon déroulement de votre livraison</p>
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
          </form>
          <h3>Modifier mon mot de passe</h3>
          <form className="form-informations" onSubmit={handlePasswordChange}>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleChange}
              placeholder="Mot de passe actuel"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nouveau mot de passe"
            />
            <input
              type="password"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Confirmer le nouveau mot de passe"
            />
            <button type="submit">Enregistrer</button>
          </form>
        </div>
      </section>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default InfosPerso;