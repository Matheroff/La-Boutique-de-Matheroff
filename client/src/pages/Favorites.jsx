import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Favorites() {

    return (
        <div>
            <section className="fil-ariane">
                <Link to="/">
                    <p type="button">Accueil ≻</p>
                </Link>
                <p>Favoris ≻</p>
            </section>
            <Footer />
        </div>
    );
}

export default Favorites;
