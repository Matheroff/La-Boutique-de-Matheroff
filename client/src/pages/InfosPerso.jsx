import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer";
import myAxios from "../services/myAxios";
import "./InfosPerso.css";

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
    console.info(name, value);
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
      console.info(formData);
      await myAxios.put(`/api/users/${myUser.id}`, formData);
      
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

        console.info(passwordData.currentPassword);
        console.info(myUser.password);
        // Vérifier que le champ "mot de passe actuel" corresponde au mot de passe de la BDD
        if (passwordData.currentPassword !== myUser.password) {
          toast.error("Le mot de passe actuel renseigné ne correspond pas.");
          return;
        }
      
        // Vérifier que les nouveaux mots de passe correspondent
        if (formData.password !== passwordData.confirmNewPassword) {
          toast.error("Le nouveau mot de passe et la confirmation ne correspondent pas.");
          return;
        }

    try {
      await myAxios.put(`/api/users/${myUser.id}`, formData);
      localStorage.setItem("myUser", JSON.stringify({ ...myUser, password: formData.password }));
      console.info(formData);
      toast.success("Les informations ont été mises à jour avec succès !");
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
        <div className="forms-flex">
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
      <ToastContainer />
    </div>
  );
}

export default InfosPerso;




// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import Footer from "../components/Footer";
// import myAxios from "../services/myAxios";
// import "./InfosPerso.css";

// function InfosPerso() {

// const myUser = JSON.parse(localStorage.getItem("myUser"));
  
//   const [formData, setFormData] = useState({
//     lastname: "",
//     firstname: "",
//     email: "",
//     phone_number: "",
//     adress: "",
//     postal_code: "",
//     city: "",
//     country: "",
//     password: "",
//   });



//   // Charger les informations de l'utilisateur connecté depuis la base de données
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {

//         const response = await myAxios.get(`/api/users/${myUser.id}`);
//         setFormData(response.data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des données utilisateur :", error);
//       }
//     };

//     fetchUserData();
//   });

// // Gérer les changements de chaque champ de formulaire
// const handleChange = (e) => {
//   const { name, value } = e.target;

//   // Vérifier si le champ est un champ de mot de passe
//   if (name === "currentPassword" || name === "newPassword" || name === "confirmNewPassword") {
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   }
// };

//   // Envoyer les données du formulaire à la base de données
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await myAxios.put(`/api/users/${myUser.id}`, formData);
//       toast.success("Les informations ont été mises à jour avec succès !");
//     } catch (error) {
//       console.error("Erreur lors de la mise à jour des informations :", error);
//       toast.error("Une erreur est survenue lors de la mise à jour des informations.");
//     }
//   };

//   // Ajout de l'état pour le mot de passe actuel et le nouveau mot de passe
// const [passwordData, setPasswordData] = useState({
//   currentPassword: "",
//   newPassword: "",
// });

// // Gérer les changements des champs de mot de passe
// const handlePasswordChange = (e) => {
//   const { name, value } = e.target;
//   setPasswordData((prevData) => ({
//     ...prevData,
//     [name]: value,
//   }));
// };

// // Fonction pour soumettre la mise à jour du mot de passe
// const handlePasswordSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await myAxios.put(`/api/users/${myUser.id}`, passwordData);

//     if (response.status === 200) {
//       toast.success("Le mot de passe a été modifié avec succès !");
//     } else {
//       toast.error("Erreur lors de la modification du mot de passe.");
//     }
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour du mot de passe :", error);
//     toast.error("Le mot de passe actuel est incorrect ou une autre erreur est survenue.");
//   }
// };


//   return (
//     <div>
//       <section className="fil-ariane">
//         <Link to="/">
//           <p type="button">Accueil ≻</p>
//         </Link>
//         <Link to="/userprofile">
//           <p type="button">Mon profil ≻</p>
//         </Link>
//         <p>Informations personnelles</p>
//       </section>
//       <section className="user-infos">
//         <h3>Mes informations</h3>
//         <div className="forms-flex">
//           <form className="form-informations" onSubmit={handleSubmit}>
//             <p>Les champs avec un * sont obligatoires <br/>afin d'assurer le bon déroulement de votre livraison</p>
//             <input
//               type="text"
//               name="lastname"
//               value={formData.lastname}
//               onChange={handleChange}
//               placeholder="Nom*"
//             />
//             <input
//               type="text"
//               name="firstname"
//               value={formData.firstname}
//               onChange={handleChange}
//               placeholder="Prénom*"
//             />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="E-mail*"
//             />
//             <input
//               type="tel"
//               name="phone_number"
//               value={formData.phone_number}
//               onChange={handleChange}
//               placeholder="Téléphone*"
//             />
//             <input
//               type="text"
//               name="adress"
//               value={formData.adress}
//               onChange={handleChange}
//               placeholder="Adresse*"
//             />
//             <input
//               type="text"
//               name="postal_code"
//               value={formData.postal_code}
//               onChange={handleChange}
//               placeholder="Code Postal*"
//             />
//             <input
//               type="text"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               placeholder="Ville*"
//             />
//             <input
//               type="text"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               placeholder="Pays*"
//             />
//             <button type="submit">Enregistrer</button>
//           </form>
//           <h3>Modifier mon mot de passe</h3>
//           <form className="form-informations" onSubmit={handlePasswordSubmit}>
//           <input
//         type="password"
//         name="currentPassword"
//         value={passwordData.currentPassword}
//         onChange={handlePasswordChange}
//         placeholder="Mot de passe actuel"
//       />
//       <input
//         type="password"
//         name="newPassword"
//         value={passwordData.newPassword}
//         onChange={handlePasswordChange}
//         placeholder="Nouveau mot de passe"
//       />
//             <button type="submit">Enregistrer</button>
//           </form>
//         </div>
//         <div className="order">
//           <Link to="/orders">
//             <button
//               className="button-2"
//               alt="Commandes"
//               type="button"
//             >
//               Voir mes commandes et factures
//             </button>
//           </Link>
//         </div>
//       </section>
//       <Footer />
//       <ToastContainer />
//     </div>
//   );
// }

// export default InfosPerso;





// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import Footer from "../components/Footer";
// import myAxios from "../services/myAxios";
// import "./InfosPerso.css";

// function InfosPerso() {
  
//   const [formData, setFormData] = useState({
//     lastname: "",
//     firstname: "",
//     email: "",
//     phone_number: "",
//     adress: "",
//     postal_code: "",
//     city: "",
//     country: "",
//     password: "",
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmNewPassword: ""
//   });

//   // Charger les informations de l'utilisateur connecté depuis la base de données
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const myUser = JSON.parse(localStorage.getItem("myUser"));
//         const response = await myAxios.get(`/api/users/${myUser.id}`);
//         setFormData(response.data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des données utilisateur :", error);
//       }
//     };

//     fetchUserData();
//   }, []);

// // Gérer les changements de chaque champ de formulaire
// const handleChange = (e) => {
//   const { name, value } = e.target;

//   // Vérifier si le champ est un champ de mot de passe
//   if (name === "currentPassword" || name === "newPassword" || name === "confirmNewPassword") {
//     setPasswordData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   } else {
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   }
// };

//   // Envoyer les données du formulaire à la base de données
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const myUser = JSON.parse(localStorage.getItem("myUser"));
//       await myAxios.put(`/api/users/${myUser.id}`, formData);
//       toast.success("Les informations ont été mises à jour avec succès !");
//     } catch (error) {
//       console.error("Erreur lors de la mise à jour des informations :", error);
//       toast.error("Une erreur est survenue lors de la mise à jour des informations.");
//     }
//   };

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
  
//     // Vérifier que tous les champs sont remplis
//     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmNewPassword) {
//       toast.error("Tous les champs de mot de passe doivent être remplis.");
//       return;
//     }
  
//     // Vérifier que les nouveaux mots de passe correspondent
//     if (passwordData.newPassword !== passwordData.confirmNewPassword) {
//       toast.error("Le nouveau mot de passe et la confirmation ne correspondent pas.");
//       return;
//     }
  
//     try {
//       const myUser = JSON.parse(localStorage.getItem("myUser"));
//       const response = await myAxios.put(`/api/users/${myUser.id}/password`, {
//         currentPassword: passwordData.currentPassword,
//         newPassword: passwordData.newPassword,
//       });
  
//       // Vérifier la réponse de l'API
//       if (response.status === 200) {
//         toast.success("Le mot de passe a été mis à jour avec succès !");
//         // Réinitialiser les champs de mot de passe après le succès
//         setPasswordData({
//           currentPassword: "",
//           newPassword: "",
//           confirmNewPassword: ""
//         });
//       } else {
//         throw new Error("Erreur inconnue lors de la mise à jour du mot de passe.");
//       }
//     } catch (error) {
//       // Afficher des messages spécifiques selon l'erreur
//       if (error.response && error.response.data && error.response.data.message) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("Une erreur est survenue lors de la mise à jour du mot de passe.");
//       }
//       console.error("Erreur lors de la mise à jour du mot de passe :", error);
//     }
//   };

//   return (
//     <div>
//       <section className="fil-ariane">
//         <Link to="/">
//           <p type="button">Accueil ≻</p>
//         </Link>
//         <Link to="/userprofile">
//           <p type="button">Mon profil ≻</p>
//         </Link>
//         <p>Informations personnelles</p>
//       </section>
//       <section className="user-infos">
//         <h3>Mes informations</h3>
//         <div className="forms-flex">
//           <form className="form-informations" onSubmit={handleSubmit}>
//             <p>Les champs avec un * sont obligatoires <br/>afin d'assurer le bon déroulement de votre livraison</p>
//             <input
//               type="text"
//               name="lastname"
//               value={formData.lastname}
//               onChange={handleChange}
//               placeholder="Nom*"
//             />
//             <input
//               type="text"
//               name="firstname"
//               value={formData.firstname}
//               onChange={handleChange}
//               placeholder="Prénom*"
//             />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="E-mail*"
//             />
//             <input
//               type="tel"
//               name="phone_number"
//               value={formData.phone_number}
//               onChange={handleChange}
//               placeholder="Téléphone*"
//             />
//             <input
//               type="text"
//               name="adress"
//               value={formData.adress}
//               onChange={handleChange}
//               placeholder="Adresse*"
//             />
//             <input
//               type="text"
//               name="postal_code"
//               value={formData.postal_code}
//               onChange={handleChange}
//               placeholder="Code Postal*"
//             />
//             <input
//               type="text"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               placeholder="Ville*"
//             />
//             <input
//               type="text"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               placeholder="Pays*"
//             />
//             <button type="submit">Enregistrer</button>
//           </form>
//           <h3>Modifier mon mot de passe</h3>
//           <form className="form-informations" onSubmit={handlePasswordChange}>
//             <input
//               type="password"
//               name="currentPassword"
//               value={passwordData.currentPassword}
//               onChange={handleChange}
//               placeholder="Mot de passe actuel"
//             />
//             <input
//               type="password"
//               name="newPassword"
//               value={passwordData.newPassword}
//               onChange={handleChange}
//               placeholder="Nouveau mot de passe"
//             />
//             <input
//               type="password"
//               name="confirmNewPassword"
//               value={passwordData.confirmNewPassword}
//               onChange={handleChange}
//               placeholder="Confirmer le nouveau mot de passe"
//             />
//             <button type="submit">Enregistrer</button>
//           </form>
//         </div>
//         <div className="order">
//           <Link to="/orders">
//             <button
//               className="button-2"
//               alt="Commandes"
//               type="button"
//             >
//               Voir mes commandes et factures
//             </button>
//           </Link>
//         </div>
//       </section>
//       <Footer />
//       <ToastContainer />
//     </div>
//   );
// }

// export default InfosPerso;