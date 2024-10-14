import { useLoaderData, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./Lists.css";
import ThemesList from "../components/ThemesList";
import ThemeForm from "../components/ThemeForm";


function Themes() {
    
    const themes = useLoaderData();
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            navigate();
        }
    };

    return (
        <div>
            <section className="fil-ariane">
                <p type="button" onClick={() => navigate("/")} aria-hidden="true" onKeyUp={handleKeyDown}>
                    Accueil ≻
                </p>
                <p type="button" onClick={() => navigate("/admin")} aria-hidden="true" onKeyUp={handleKeyDown}>
                    Tableau de bord ≻
                </p>
                <p>Thèmes</p>
            </section>
            <section className="add-category-theme">
                <h3>Thèmes</h3>
                <ThemeForm />
                <div className="row-list">
                <ThemesList themes={themes} />
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Themes;

