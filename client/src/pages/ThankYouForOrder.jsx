import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../pages/Orders.css";
import confetti from "canvas-confetti";
import thankyou from "../assets/images/thankyou.png";
import Footer from "../components/Footer";

function ThankYouForOrder() {
    useEffect(() => {
        // Fonction pour lancer les confettis
        const launchConfetti = () => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        };

        // Lancer les confettis lorsque le composant est monté
        launchConfetti();
    }, []);

    return ( 
        <div>
            <section className="thanks-order">
              <h3>Merci beaucoup pour ta commande !</h3>
              <img src={thankyou} alt="Sourire"/>
              <Link to="/">
                <button
                  className="button-2"
                  alt="Commandes"
                  type="button"
                >
                  Retour à l'accueil
                </button>
              </Link>
            </section>
            <Footer />
        </div>
    );
}

export default ThankYouForOrder;
