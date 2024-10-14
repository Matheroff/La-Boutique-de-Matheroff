import { useNavigate } from "react-router-dom";
import "./Order.css";
import Footer from "../components/Footer";
import smiley from "../assets/images/smiley.png";

function Orders() {

  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate();
    }
  };
  

    return(
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
                <p>Commandes</p>
            </section>
            <section className="order-info">
              <h3>Mes commandes</h3>
              <div>

              </div>
              <button
                alt="Commandes"
                type="button"
                onClick={() => navigate("/infosperso")}
                onKeyUp={handleKeyDown}
              >
                Voir mes informations personnelles
              </button>
            </section>
            <section className="order-section">
              <p>Tu n'as pas encore passé de commande dans notre boutique</p>
              <p>Remédie à cela</p>
              <img src={smiley} alt="sourire"/>
              <button
                alt="Commandes"
                type="button"
                onClick={() => navigate("/shop")}
                onKeyUp={handleKeyDown}
              >
                Voir la boutique
              </button>
            </section>
            <Footer />
        </div>
    )
}

export default Orders;