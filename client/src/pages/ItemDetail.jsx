import { useLoaderData, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./ItemDetail.css";
import myAxios from "../services/myAxios";
import Footer from "../components/Footer";
import SimilarItems from "../components/SimilarItems";

function ItemDetail() {

    const [item, items, initialCarts, initialFavorites] = useLoaderData();

/* ********************JS pour le bouton "quantité"******************* */
    const [quantity, setQuantity] = useState(1);
    const [customQuantity, setCustomQuantity] = useState("");
    const [isCustom, setIsCustom] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    
    const [favorites, setFavorites] = useState(initialFavorites || []);
    const [carts, setCarts] = useState(initialCarts || []);

    const myUser = JSON.parse(localStorage.getItem('myUser'));

    useEffect(() => {
        window.scrollTo(0, 0);

        // Vérifie si l'article est déjà en favoris
        if (myUser && favorites) {
            const alreadyFavorite = favorites.some(fav => fav.id_item === item.id && fav.id_user === myUser.id);
            setIsFavorite(alreadyFavorite);
        }

        // Vérifie si l'article est déjà dans le panier
        if (myUser && carts) {
            const alreadyInCart = carts.some(cart => cart.id_item === item.id && cart.id_user === myUser.id);
            setIsInCart(alreadyInCart);
        }
    }, [favorites, carts, item, myUser]);
  
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
        try {
            if (myUser) {
                if (!isInCart) {
                    const response = await myAxios.post("/api/carts", {id_user: myUser.id, id_item: item.id, quantity: quantity});
                    if (response && response.data) {
                        setIsInCart(true);
                        setCarts(prevCarts => [...prevCarts, { id_user: myUser.id, id_item: item.id, quantity }])
                        toast.success("Article ajouté au panier !");
                    }
                } else {
                    toast.info("Article déjà ajouté au panier !");
                }
            } else {
                toast.error("Vous devez vous connecter pour ajouter un article au panier !")
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'article au panier:", error);
        }
    };

      const toggleFavorite = async (e) => {
        e.preventDefault();
        try {
            if (myUser) {
                if (!isFavorite) {
                    const response = await myAxios.post("/api/favorites", {id_user: myUser.id, id_item: item.id});
                    if (response && response.data) {
                        setIsFavorite(true);
                        setFavorites(prevFavorites => [...prevFavorites, { id: response.data.insertId, id_user: myUser.id, id_item: item.id }]);
                        toast.success("Article ajouté aux favoris !");
                    }
                } else {
                    const fav = favorites.find(fav => fav.id_item === item.id && fav.id_user === myUser.id);
                    if (fav) {
                        const response = await myAxios.delete(`/api/favorites/${fav.id}`);
                        if (response) {
                            setIsFavorite(false);
                            setFavorites(prevFavorites => prevFavorites.filter(f => f.id_item !== item.id));
                            toast.success("Article retiré des favoris !")
                        }
                    }
                }
            } else {
                setIsFavorite(false);
                toast.error("Vous devez vous connecter pour ajouter un article aux favoris !")
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'article aux favoris");
        }
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