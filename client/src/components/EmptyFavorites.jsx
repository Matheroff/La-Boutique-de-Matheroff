import { Link } from "react-router-dom";
import favoritestar from "../assets/images/favoritestar.png";
import "../pages/Favorites.css";

function EmptyFavorites() {

    return ( 
        <div>
            <section className="empty-favorites">
                <p>Vous n'avez pas de favoris</p>
                <img src={favoritestar} alt="Panier vide"/>
                <Link to="/shop">
                    <button type="button">
                        Voir la boutique
                    </button>
                </Link>
            </section>
        </div>
    )
}

export default EmptyFavorites;