import "./Home.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import CategoriesIntro from "../components/CategoriesIntro";
import Suggestions from "../components/Suggestions";
import OurThemes from "../components/OurThemes";

function Home() {

    const navigate = useNavigate();

    return (
        <div className="column">
            <CategoriesIntro />
            <Suggestions />
            <OurThemes />
            <div className="button">
                <button className="button-see-shop"
                    type="button"
                    onClick={() => navigate("/shop")}
                >
                    Voir la boutique
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default Home;