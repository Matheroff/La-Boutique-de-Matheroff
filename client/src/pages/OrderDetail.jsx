import { useLoaderData, Link } from "react-router-dom";
import "./OrderDetail.css";
import { useState } from "react";
import Footer from "../components/Footer";

function OrderDetail() {

    const [orders, userOrders, items] = useLoaderData();

    const [orderItems, setOrderItems] = useState(
        userOrders
          .map((uo) => {
            const item = items.find((item) => item.id === uo.id_item);
            return {
              ...uo,
              ...item
            };
          })
      );

    return(
        <div>
            <section className="fil-ariane">
              <Link to="/">
                <p type="button">Accueil ≻</p>
              </Link>
              <Link to="/userprofile">
                <p type="button">Mon profil ≻</p>
              </Link>
              <Link to="/orders">
                <p type="button">Mes commandes ≻</p>
              </Link>
              <p>Détail de ma commande</p>
            </section>
            <section className="order-detail">
                <div>
                    <h3>Commande numéro {orders.id}</h3>
                    <p>{orders.item_quantity} {orders.item_quantity > 1 ? 'articles' : 'article'}</p>
                    <p>Prix total : {orders.total_order} €</p>
                    <p>Statut : {orders.statut}</p>
                </div> 
            {orderItems.map((item) => (
                    <div className="image-container" key={item.name}>
                        <img src={item.image} alt={item.name} />
                        <div>
                            <h3>{item.name}</h3>
                            <p>x {item.item_quantity}</p>
                        </div>
                    </div>
                ))}
            </section>
            <Footer />
        </div>
    )
}

export default OrderDetail;