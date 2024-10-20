import "./Home.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import CategoriesIntro from "../components/CategoriesIntro";
import Suggestions from "../components/Suggestions";
import OurThemes from "../components/OurThemes";

function Home() {

    return (
        <div className="column">
            <CategoriesIntro />
            <Suggestions />
            <OurThemes />
            <div className="button">
                <Link to="/shop">
                    <button 
                        className="button-see-shop"
                        type="button"
                    >
                        Voir la boutique
                    </button>
                </Link>
            </div>
            <Footer />
        </div>
    );
}

export default Home;