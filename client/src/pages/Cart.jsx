import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import EmptyCart from "../components/EmptyCart";

function Cart() {

    const [cartItems, setCartItems] = useState([]); // État pour les articles du panier

    return (
        <div>
            <section className="fil-ariane">
                <Link to="/">
                    <p type="button">Accueil ≻</p>
                </Link>
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