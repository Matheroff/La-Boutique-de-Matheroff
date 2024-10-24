import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import EmptyCart from "../components/EmptyCart";
import "./Cart.css";

function Cart() {

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Mug Super Mario Bros",
      description: "Mug Super Mario Bros avec les différents Mario au fil des années",
      image: "https://th.bing.com/th/id/OIP.1uDcKwlqgfZMg-fEplYYZwHaHa?rs=1&pid=ImgDetMain",
      unit_price: 10.00,
      quantity: 1,
    },
    {
      id: 2,
      name: "T-Shirt Ultra Vomit",
      description: "T-Shirt Ultra Vomit Je collectionne des canards (vivants) / Nos tailles de t-shirts sont standards et uniques",
      image: "https://th.bing.com/th/id/R.f854b6aac010865b936c7820f290cb83?rik=dxlgXAuiKLCS0g&pid=ImgRaw&r=0",
      unit_price: 15.00,
      quantity: 1,
    },
  ]);

  /* ********************JS pour le bouton "quantité"******************* */
  const [quantity, setQuantity] = useState(1); // Quantité par défaut
  const [customQuantity, setCustomQuantity] = useState(""); // Quantité personnalisée
  const [isCustom, setIsCustom] = useState(false); // Vérifie si la quantité est personnalisée ou non

  // Gère le changement dans la sélection de quantité
  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "+") {
      setIsCustom(true); // Active l'input de quantité personnalisée
      setQuantity(""); // Réinitialise la quantité sélectionnée
    } else {
      setIsCustom(false); // Désactive l'input personnalisé
      setQuantity(Number(value)); // Met à jour la quantité choisie
    }
  };

  // Gère le changement dans le champ de quantité personnalisée
  const handleCustomChange = (event) => {
    setCustomQuantity(event.target.value); // Met à jour la quantité personnalisée
    setQuantity(Number(event.target.value)); // Met à jour la quantité globale
  };

  return (
    <div>
        <section className="fil-ariane">
            <Link to="/">
                <p type="button">Accueil ≻</p>
            </Link>
            <p>Mon panier ≻</p>
        </section>
        <section className="cart-container">
    {cartItems.length === 0 ? (
        <EmptyCart />
    ) : (
        <>
            <div className="items-list">
                {cartItems.map((item) => (
                    <div className="item-cart" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <div className="item-cart-infos">
                            <p>{item.name}</p>
                            <p>Prix unité : {item.unit_price} €</p>
                            <div>
                                <label htmlFor="quantity">Quantité :</label>
                                <select
                                    id="quantity"
                                    value={isCustom ? "+" : quantity}
                                    onChange={handleSelectChange}
                                >
                                    {[...Array(10).keys()].map((num) => (
                                        <option key={num + 1} value={num + 1}>
                                            {num + 1}
                                        </option>
                                    ))}
                                    <option value="+">+</option>
                                </select>
                                {isCustom && (
                                    <input
                                        type="number"
                                        min="11"
                                        value={customQuantity}
                                        onChange={handleCustomChange}
                                        placeholder="Entrez la quantité"
                                    />
                                )}
                                <div className="img-title-text">
                                    <button type="button">X</button>
                                    <span className="hover-text">Supprimer du panier</span>
                                </div>
                            </div>
                        </div>
                        <p>Prix : {item.unit_price * item.quantity}€</p>
                    </div>
                ))}
            </div>
            <div className="total-cart">
                <h2>Total :</h2>
                <h2>25€</h2>
                <button type="submit">Passer la commande</button>
            </div>
        </>
    )}
</section>

      <Footer />
    </div>
  );
}

export default Cart;
