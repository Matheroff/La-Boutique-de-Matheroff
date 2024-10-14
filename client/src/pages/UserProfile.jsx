import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import Footer from "../components/Footer";
import Commande from "../assets/images/commande.jpg";
import InfoPerso from "../assets/images/infoperso.jpg";

function UserProfile() {

    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          navigate();
        }
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
                <p>Mon profil</p>
            </section>
            <section>
                    <h2>Bienvenue Mathieu !</h2>
                    <h3>Ravi de vous voir !</h3>
                <div className="user-profile">
                    <div>
                        <h3> Mes commandes</h3>
                        <img
                            src={Commande} 
                            alt="Commandes"
                            type="button"
                            onClick={() => navigate("/orders")}
                            onKeyUp={handleKeyDown}
                        />
                    </div>
                    <div>
                        <h3>Mes informations personnelles</h3>
                        <img
                            src={InfoPerso} 
                            alt="Informations personnelles"
                            type="button"
                            onClick={() => navigate("/infosperso")}
                            onKeyUp={handleKeyDown}
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default UserProfile;