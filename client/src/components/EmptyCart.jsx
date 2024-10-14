import { useNavigate } from "react-router-dom";
import Emptycart from "../assets/images/paniervide.png";
import "../pages/Cart.css";

function EmptyCart() {

    const navigate = useNavigate();

    return ( 
        <div>
            <section className="empty-cart">
                <p>Votre panier est vide</p>
                <img src={Emptycart} alt="Panier vide"/>
                <button
                    type="button"
                    onClick={() => navigate("/")}
                >
                    Retour à l'accueil
                </button>
            </section>
        </div>
    )
}

export default EmptyCart;