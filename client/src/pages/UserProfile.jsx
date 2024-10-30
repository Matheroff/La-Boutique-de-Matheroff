import { Link, useLoaderData, useNavigate } from "react-router-dom";
import "./UserProfile.css";
import Footer from "../components/Footer";
import Commande from "../assets/images/commande.jpg";
import InfoPerso from "../assets/images/infoperso.jpg";
import DashboardButton from "../components/DashboardButton";

function UserProfile() {
    
    const navigate = useNavigate();
    const myUser = JSON.parse(localStorage.getItem("myUser"));
    const user = useLoaderData();
    console.info(user);

    const handleSubmit = () => {
        // Je retire mon user du localStorage et me redirige vers la page home
        localStorage.removeItem('myUser')
        navigate('/')
    };

    return (
        <div>
            <section className="fil-ariane">
                <Link to="/">
                    <p type="button">Accueil ≻</p>
                </Link>
                <p>Mon profil</p>
            </section>
            <section className="exit-button">
                <button
                    className="button-2"
                    type="button" 
                    onClick={handleSubmit}
                >
                    Déconnexion
                </button>
                {myUser && myUser.is_admin === 1 && (
                    <DashboardButton />
                )}
            </section>
            <section>
                {user && user.firstname && user.lastname && (<h2>Profil de {user.firstname} {user.lastname}</h2>)}
                {!user && (
                    <>
                        <h2>Bienvenue {myUser && myUser.firstname ? myUser.firstname : ""} !</h2>
                        <h3>Ravi de vous voir !</h3>
                    </>
                )}
                <div className="user-profile">
                    <div>
                        <h3> Commandes</h3>
                        <Link to="/orders">
                            <img
                                src={Commande} 
                                alt="Commandes"
                                type="button"
                            />
                        </Link>
                    </div>
                    <div>
                        <h3>Informations personnelles</h3>
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
