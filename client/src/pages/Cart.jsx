import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import EmptyCart from "../components/EmptyCart";
import "./Cart.css";

function Cart() {
  // État pour les articles du panier avec des données en dur
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
  ]); // On a inséré deux articles fictifs avec leurs détails

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
            <p>Mon panier</p>
        </section>
        <section className="item-cart">
            {cartItems.length === 0 ? (
            // Si le panier est vide, on affiche le composant EmptyCart
            <EmptyCart />
            ) : (
            
            // Parcours des articles du panier et affichage des infos de chaque item
            cartItems.map((item) => (
            <div key={item.id}>
                <div className="item-cart-img">
                    <img src={item.image} alt={item.name} />
                </div>
                <div className="item-cart-infos">
                    <h3>{item.name}</h3>
                    <h3>{item.unit_price} €</h3>
                    <div className="quantity-button">
                        <label htmlFor="quantity">Quantité :</label>
                        <select
                            id="quantity"
                            value={isCustom ? "+" : quantity}
                            onChange={handleSelectChange}
                        >
                            {/* Génère un menu déroulant avec des valeurs de 1 à 10 */}
                            {[...Array(10).keys()].map((num) => (
                            <option 
                                key={num + 1} 
                                value={num + 1}>
                                {num + 1}
                            </option>
                            ))}
                            <option value="+">+</option> {/* Option pour ajouter une quantité personnalisée */}
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
                    </div>
                <div>
                    <p>{item.unit_price * item.item_quantity}</p>
                </div>    
                </div>
            </div>
            ))
            )}
        </section>
      <Footer />
    </div>
  );
}

export default Cart;
