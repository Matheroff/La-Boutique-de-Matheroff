import { Link } from "react-router-dom";
import "./Order.css";
import Footer from "../components/Footer";
import smiley from "../assets/images/smiley.png";

function Orders() {

    return(
        <div>
            <section className="fil-ariane">
              <Link to="/">
                <p type="button">Accueil ≻</p>
              </Link>
              <Link to="/userprofile">
                <p type="button">Mon profil ≻</p>
              </Link>
              <p>Commandes</p>
            </section>
            <section className="order-info">
              <h3>Mes commandes</h3>
              <Link to="/infosperso">
                <button
                  alt="Commandes"
                  type="button"
                >
                  Voir mes informations personnelles
                </button>
              </Link>
            </section>
            <section className="order-section">
              <p>Tu n'as pas encore passé de commande dans notre boutique</p>
              <p>Remédie à cela</p>
              <img src={smiley} alt="sourire"/>
              <Link to="/shop">
                <button
                  alt="Commandes"
                  type="button"
                >
                  Voir la boutique
                </button>
              </Link>
            </section>
            <Footer />
        </div>
    )
}

export default Orders;