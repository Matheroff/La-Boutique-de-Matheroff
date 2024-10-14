import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Admin() {
    
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          navigate();
        }
      };

    return (

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
                <p>Tableau de bord</p>
            </section>
            <Footer />
        </div>
    )
}

export default Admin;