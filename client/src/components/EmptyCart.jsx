import { Link } from "react-router-dom";
import Emptycart from "../assets/images/paniervide.png";
import "../pages/Cart.css";

function EmptyCart() {

    return ( 
        <div>
            <section className="empty-cart">
                <p>Votre panier est vide</p>
                <img src={Emptycart} alt="Panier vide"/>
                <Link to="/">
                    <button
                        className="button-2" 
                        type="button"
                    >
                        Retour à l'accueil
                    </button>
                </Link>
            </section>
        </div>
    )
}

export default EmptyCart;