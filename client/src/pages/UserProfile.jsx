import { Link } from "react-router-dom";
import "./UserProfile.css";
import Footer from "../components/Footer";
import Commande from "../assets/images/commande.jpg";
import InfoPerso from "../assets/images/infoperso.jpg";

function UserProfile() {
    const myUser = JSON.parse(localStorage.getItem('myUser'));
    console.log('locaStorage / UserProfile')
    console.log(myUser)

    return (
        <div>
            <section className="fil-ariane">
                <Link to="/">
                    <p type="button">Accueil ≻</p>
                </Link>
                <p>Mon profil</p>
            </section>
            <section>
                <h2>Bienvenue {myUser.firstname} !</h2>
                <h3>Ravi de vous voir !</h3>
                <div className="user-profile">
                    <div>
                        <h3> Mes commandes</h3>
                        <Link to="/orders">
                            <img
                                src={Commande} 
                                alt="Commandes"
                                type="button"
                            />
                        </Link>
                    </div>
                    <div>
                        <h3>Mes informations personnelles</h3>
                        <Link to="/infosperso">
                            <img
                                src={InfoPerso} 
                                alt="Informations personnelles"
                                type="button"
                            />
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default UserProfile;