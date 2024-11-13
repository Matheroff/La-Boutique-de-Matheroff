import "./Unauthorized.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ahahah from "../assets/images/ahahah.gif";

function Unauthorized() {

    return (
        <div className="not-authorized">
            <h3>Accès non autorisé</h3>
            <img 
                className="dennis" 
                src={ahahah} 
                alt="Accès non autorisé"/>
            <Link to="/">
                <button
                    className="button-2" 
                    type="button"
                >
                    Retour à l'accueil
                </button>
            </Link>
            <Footer />
        </div>
    );
}

export default Unauthorized;