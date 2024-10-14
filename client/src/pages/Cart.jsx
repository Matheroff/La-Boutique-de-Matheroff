import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import EmptyCart from "../components/EmptyCart";

function Cart() {

    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]); // État pour les articles du panier

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
                <p>Mon panier</p>
            </section>
            {cartItems.length === 0 ? (
                <EmptyCart /> // Affiche EmptyCart si le panier est vide
            ) : (
                <div>
                    {/* Affichez ici les articles du panier */}
                </div>
            )}
            <Footer />
        </div>
    )
}

export default Cart;