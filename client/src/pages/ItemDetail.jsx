import { useLoaderData, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./ItemDetail.css";
import myAxios from "../services/myAxios";
import Footer from "../components/Footer";
import SimilarItems from "../components/SimilarItems";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ItemDetail() {

    const [item, items] = useLoaderData();
    console.log(item)

    useEffect(() => {
        window.scrollTo(0, 0); // Défiler en haut de la page
    }, []);

/* ********************JS pour le bouton "quantité"******************* */
    const [quantity, setQuantity] = useState(1);
    const [customQuantity, setCustomQuantity] = useState("");
    const [isCustom, setIsCustom] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const myUser = JSON.parse(localStorage.getItem('myUser'));
  
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

    const handleAddCart = async (e) => {
        e.preventDefault();
        /*const [cartItems, setCartItems] = useState([]);

            useEffect(() => {
                // Récupérer le panier dans le localStorage (ou un autre stockage)
                const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
                setCartItems(storedCart);
            }, []);*/
        try {
            if (myUser) {
                // @TODO : A améliorer pour le cas où on ajoute deux fois le même item
                const response = await myAxios.post("/api/carts", {id_user: myUser.id, id_item: item.id, quantity: quantity});
                if (response && response.data) {
                    /* localStorage.setItem(
                        'myUser', 
                        JSON.stringify({id: response.data.insertId, email: formData.email, password: formData.password})
                    );*/
                    localStorage.setItem('cart', JSON.stringify({id_item: item.id}))
                    toast.success("Article ajouté au panier !");
                }
            } else {
                toast.error("Vous devez vous connecter pour ajouter un article !");
            }
        } 
        catch (error) {
            console.error("Erreur lors de l'ajout de l'article au panier:", error);
        }
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
                <ToastContainer />
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
                    <button type="button" onClick={handleAddCart}>Ajouter au panier</button>
                </div>
            </section>
            <SimilarItems currentItem={item}/>
            <Footer />
        </div>
    );
}

export default ItemDetail;