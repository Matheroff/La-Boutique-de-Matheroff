import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import EmptyFavorites from "../components/EmptyFavorites";
import Footer from "../components/Footer";
import "./Favorites.css";
import myAxios from "../services/myAxios";

function Favorites() {

  const [favorites, items] = useLoaderData();
  const myUser = JSON.parse(localStorage.getItem("myUser"));

    // Initialiser favoriteItems avec les articles de l'utilisateur filtrés et enrichis
    const [favoriteItems, setFavoriteItems] = useState(
      favorites
        .filter((favorite) => favorite.id_user === myUser.id)
        .map((favorite) => {
          const itemDetails = items.find((item) => item.id === favorite.id_item);
          return {
            favoriteId: favorite.id, // ID du panier
            ...favorite,
            ...itemDetails, // Détails de l'article
            isCustom: false, // État pour gérer l'option personnalisée
            customQuantity: "", // Quantité personnalisée
          };
        })
    );

    const handleRemoveItem = async (id) => {
      setFavoriteItems((prevItems) => prevItems.filter((item) => item.id !== id));
      const item = favoriteItems.find((item) => item.id_item === id);
      await myAxios.delete(`/api/favorites/${item.favoriteId}`);
    };

  return (
    <div className="column">
      <section className="fil-ariane">
        <Link to="/">
          <p type="button">Accueil ≻</p>
        </Link>
        <p>Mes favoris ≻</p>
      </section>
      {favoriteItems.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <section className="grid-favorites-items">
          {favoriteItems.map((item) => (
            <div className="item-favorites-card" key={item.id}>
              <div className="img-title-text">
                <button
                  className="remove-favorite"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveItem(item.id);
                  }}
                >
                  ✕
                </button>
                <span className="hover-text">Supprimer des favoris</span>
              </div>
              <Link to={`/item/${item.id}`}>
                <img src={item.image} alt="Article" />
                <p>{item.name}</p>
                <button type="button">Voir +</button>
              </Link>
            </div>
          ))}
        </section>
      )}
      <Footer />
    </div>
  );
}

export default Favorites;