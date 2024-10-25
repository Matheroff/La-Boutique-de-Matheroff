import { Link } from "react-router-dom";
import { useState } from "react";
import EmptyFavorites from "../components/EmptyFavorites";
import Footer from "../components/Footer";
import "./Favorites.css";

function Favorites() {

  const [cartItems, setCartItems] = useState([
    {
      id: 27,
      name: "Mug Super Mario Bros",
      description: "Mug Super Mario Bros avec les différents Mario au fil des années",
      image: "https://th.bing.com/th/id/OIP.1uDcKwlqgfZMg-fEplYYZwHaHa?rs=1&pid=ImgDetMain",
      unit_price: 10.00,
      quantity: 1,
    },
    {
        id: 45,
        name: "Mug Super Mario Bros",
        description: "Mug Super Mario Bros avec les différents Mario au fil des années",
        image: "https://th.bing.com/th/id/OIP.1uDcKwlqgfZMg-fEplYYZwHaHa?rs=1&pid=ImgDetMain",
        unit_price: 10.00,
        quantity: 1,
    },
    {
        id: 47,
        name: "Mug Super Mario Bros",
        description: "Mug Super Mario Bros avec les différents Mario au fil des années",
        image: "https://th.bing.com/th/id/OIP.1uDcKwlqgfZMg-fEplYYZwHaHa?rs=1&pid=ImgDetMain",
        unit_price: 10.00,
        quantity: 1,
    },
  ]);

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };


  return (
    <div>
        <section className="fil-ariane">
            <Link to="/">
                <p type="button">Accueil ≻</p>
            </Link>
            <p>Mes favoris ≻</p>
        </section>
        <section className="grid-items">
            {cartItems.length === 0 ? (
            <EmptyFavorites />
            ) : (
            <>
                {cartItems.map((item) => (
                    <Link to={(`/item/${item.id}`)} key={item.id}>
                        <div className="item-card">
                            <div className="img-title-text">
                                <button 
                                    className="remove-favorite" 
                                    type="button"
                                    onClick={(e) => {
                                    e.preventDefault(); // Empêche la navigation lors du clic sur la croix
                                    handleRemoveItem(item.id);
                                    }}
                                >
                                    ✕
                                </button>
                                <span className="hover-text">Supprimer des favoris</span>
                            </div>
                            <img src={item.image} alt="Article" />
                            <p>{item.name}</p>
                            <button type="button">Voir +</button>
                        </div>
                    </Link>
                ))}
            </>
            )}
        </section>

      <Footer />
    </div>
  );
}

export default Favorites;