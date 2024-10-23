import { useLoaderData, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./ItemDetail.css";
import Footer from "../components/Footer";
import SimilarItems from "../components/SimilarItems";

function ItemDetail() {

    const items = useLoaderData();
    const item = items[0]

    useEffect(() => {
        window.scrollTo(0, 0); // Défiler en haut de la page
    }, []);

/* ********************JS pour le bouton "quantité"******************* */
    const [quantity, setQuantity] = useState(1);
    const [customQuantity, setCustomQuantity] = useState("");
    const [isCustom, setIsCustom] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
  
    const handleSelectChange = (event) => {
      const value = event.target.value;
      if (value === "+") {
        setIsCustom(true);
        setQuantity("");
      } else {
        setIsCustom(false);
        setQuantity(Number(value));
      }
    };
  
    const handleCustomChange = (event) => {
      setCustomQuantity(event.target.value);
      setQuantity(Number(event.target.value));
    };
/* ********************JS pour le bouton "quantité"******************* */

      const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div>
            <section className="fil-ariane">
                <Link to="/">
                    <p type="button">Accueil ≻</p>
                </Link>
                <Link to="/shop">
                    <p type="button">Nos articles ≻</p>
                </Link>
            </section>
            <section className="item-details">
                <div className="image-container">
                    <img src={item.image} alt={item.name} />
                    <div className="favorite-icon" 
                        onClick={toggleFavorite}
                        aria-hidden="true"
                    >
                        {isFavorite ? <FaHeart /> : <FaRegHeart />}
                    </div>
                </div>
                <div className="item-infos">
                    <h3>{item.name}</h3>
                    <h3>{item.unit_price} €</h3>
                    <p>{item.description}</p>
                    <div className="quantity-button">
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
                    </div>
                    <Link to="/shop">
                        <button type="button">Ajouter au panier</button>
                    </Link>
                </div>
            </section>
            <SimilarItems currentItem={item}/>
            <Footer />
        </div>
    );
}

export default ItemDetail;