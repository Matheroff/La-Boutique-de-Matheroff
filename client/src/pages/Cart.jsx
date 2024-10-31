import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import EmptyCart from "../components/EmptyCart";
import "./Cart.css";
import myAxios from "../services/myAxios";

function Cart() {
  const [carts, items] = useLoaderData();
  const myUser = JSON.parse(localStorage.getItem("myUser"));

  // Initialiser cartItems avec les articles de l'utilisateur filtrés et enrichis
  const [cartItems, setCartItems] = useState(
    carts
      .filter((cart) => cart.id_user === myUser.id)
      .map((cart) => {
        const itemDetails = items.find((item) => item.id === cart.id_item);
        return {
          cartId: cart.id, // ID du panier
          ...cart,
          ...itemDetails, // Détails de l'article
          isCustom: false, // État pour gérer l'option personnalisée
          customQuantity: "", // Quantité personnalisée
        };
      })
  );

  // Gérer le changement de quantité
  const handleQuantityChange = async (id, value) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: value === "+" ? item.quantity : Number(value),
              isCustom: value === "+", // Activer l'input si "personnalisée" est sélectionné
              customQuantity: value === "+" ? item.customQuantity : "", // Réinitialiser customQuantity
            }
          : item
      )
    );
    if (value !== "+") {
      // Met à jour la quantité en base si ce n'est pas "personnalisé"
      const item = cartItems.find((item) => item.id_item === id);
      await myAxios.put(`/api/carts/${item.cartId}`, {
        id_item: item.id_item,
        id_user: item.id_user,
        quantity: Number(value),
      });
    }
  };

  // Gérer la quantité personnalisée
  const handleCustomQuantityChange = async (id, value) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number(value),
              customQuantity: value,
            }
          : item
      )
    );
    // Met à jour la quantité en base
    const item = cartItems.find((item) => item.id_item === id);
    await myAxios.put(`/api/carts/${item.cartId}`, {
      id_item: item.id_item,
      id_user: item.id_user,
      quantity: Number(value),
    });
  };

  // Gérer la suppression d'un article du panier
  const handleRemoveItem = async (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    const item = cartItems.find((item) => item.id_item === id);
    await myAxios.delete(`/api/carts/${item.cartId}`);
  };

  // Calcul du prix total
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  );

  return (
    <div>
      <section className="fil-ariane">
        <Link to="/">
          <p type="button">Accueil ≻</p>
        </Link>
        <p>Mon panier ≻</p>
      </section>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <section className="cart-container">
          <div className="items-list">
            {cartItems.map((item) => (
              <div className="item-cart" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="item-cart-infos">
                  <p>{item.name}</p>
                  <p>Prix unité : {item.unit_price} €</p>
                  <div>
                    <label htmlFor={`quantity-${item.id}`}>Quantité :</label>
                    <select
                      id={`quantity-${item.id}`}
                      value={item.isCustom ? "+" : item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                      <option value="+">+</option>
                    </select>
                    {item.isCustom && (
                      <input
                        type="number"
                        min="11"
                        value={item.customQuantity}
                        onChange={(e) =>
                          handleCustomQuantityChange(item.id, e.target.value)
                        }
                        placeholder="Entrez la quantité"
                      />
                    )}
                    <div className="img-title-text">
                      <button type="button" onClick={() => handleRemoveItem(item.id)}>
                        ✕
                      </button>
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
            <h2>{totalPrice}€</h2>
            <button type="submit">Passer la commande</button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default Cart;
