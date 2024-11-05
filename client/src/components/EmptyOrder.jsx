import { Link } from "react-router-dom";
import "../pages/Orders.css";
import smiley from "../assets/images/smiley.png";

function EmptyOrder() {

    return ( 
        <div>
            <section className="empty-order-section">
              <p>Tu n'as pas encore passé de commande dans notre boutique</p>
              <p>Remédie à cela</p>
              <img src={smiley} alt="Sourire"/>
              <Link to="/shop">
                <button
                  className="button-2"
                  alt="Commandes"
                  type="button"
                >
                  Voir la boutique
                </button>
              </Link>
            </section>
        </div>
    )
}

export default EmptyOrder;