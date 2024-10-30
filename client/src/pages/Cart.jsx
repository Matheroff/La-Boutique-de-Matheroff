import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import EmptyCart from "../components/EmptyCart";
import "./Cart.css";

function Cart() {

  const [carts, items] = useLoaderData();
  const [cartItems, setCartItems] = useState(carts);
  const myUser = JSON.parse(localStorage.getItem("myUser"));
  console.info(myUser);

  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "Mug Super Mario Bros",
  //     description: "Mug Super Mario Bros avec les différents Mario au fil des années",
  //     image: "https://th.bing.com/th/id/OIP.1uDcKwlqgfZMg-fEplYYZwHaHa?rs=1&pid=ImgDetMain",
  //     unit_price: 10.00,
  //     quantity: 1,
  //   },
  //   {
  //     id: 2,
  //     name: "T-Shirt Ultra Vomit",
  //     description: "T-Shirt Ultra Vomit Je collectionne des canards (vivants) / Nos tailles de t-shirts sont standards et uniques",
  //     image: "https://th.bing.com/th/id/R.f854b6aac010865b936c7820f290cb83?rik=dxlgXAuiKLCS0g&pid=ImgRaw&r=0",
  //     unit_price: 15.00,
  //     quantity: 1,
  //   },
  // ]);

  // useEffect(() => {
  //   if (myUser && carts) {
  //     // setCartItems(cart.filter((item) => item.id_user === myUser.id))
  //     const myUserCart = carts.some(cart => cart.id_user === myUser.id)
  //     setCartItems(myUserCart);
  //   }
  // }, [carts, myUser]);

  // Gère la suppression d'un article du panier
  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  // Gère le changement de quantité
  const handleQuantityChange = (id, value) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: value === "+" ? item.quantity : Number(value),
            customQuantity: value === "+" ? item.quantity : "",
            isCustom: value === "+",
          }
        : item
    );
    setCartItems(updatedCartItems);
  };

  // Gère la quantité personnalisée
  const handleCustomQuantityChange = (id, value) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Number(value),
            customQuantity: value,
          }
        : item
    );
    setCartItems(updatedCartItems);
  };

  // const totalPrice = cartItems.reduce(
  //   (acc, item) => acc + item.unit_price * item.quantity,
  //   0
  // );

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
            {cartItems.map((cart) => (
              <div className="item-cart" key={cart.id}>
                <img src={item.image} alt={item.name} />
                <div className="item-cart-infos">
                  <p>{item.name}</p>
                  <p>Prix unité : {item.unit_price} €</p>
                  <div>
                    <label htmlFor={`quantity-${item.id}`}>Quantité :</label>
                    <select
                      id={`quantity-${item.id}`}
                      value={item.isCustom ? "+" : item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
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
                        onChange={(e) => handleCustomQuantityChange(item.id, e.target.value)}
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
            {/* <h2>{totalPrice}€</h2> */}
            <button type="submit">Passer la commande</button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default Cart;
