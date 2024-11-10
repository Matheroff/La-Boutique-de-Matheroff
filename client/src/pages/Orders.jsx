import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import "./Orders.css";
import Footer from "../components/Footer";
import EmptyOrder from "../components/EmptyOrder";

function Orders() {

  const orders = useLoaderData();
  const myUser = JSON.parse(localStorage.getItem("myUser"));

  // filtre sur les commandes de l'utilisateur
  const [ordersUser, setOrdersUser] = useState(
    orders
      .filter((order) => order.id_user === myUser.id)
      .map((order) => ({ ...order }))
  );

  return (
    <div>
      <section className="fil-ariane">
        <Link to="/">
          <p type="button">Accueil ≻</p>
        </Link>
        <Link to="/userprofile">
          <p type="button">Mon profil ≻</p>
        </Link>
        <p>Mes commandes</p>
      </section>
      <section className="order-info">
        <h3>Mes commandes</h3>
        <Link to="/infosperso">
          <button
            className="button-2"
            alt="Commandes"
            type="button"
          >
            Voir mes informations personnelles
          </button>
        </Link>
      </section>
      {orders.length === 0 ? (
        <EmptyOrder />
      ) : (
        <section className="order-list">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Numéro de commande</th>
                <th>Date</th>
                <th>Nombre d'articles</th>
                <th>Total</th>
                <th>Statut</th>
                <th>Détail commande</th>
              </tr>
            </thead>
            <tbody>
              {ordersUser.map((order) => (
                <tr key={order.id} className="order-item">
                  <td>{order.id}</td>
                  <td>{new Date(order.order_date).toLocaleDateString('fr-FR')}</td>
                  <td>{order.item_quantity} {order.item_quantity > 1 ? 'articles' : 'article'}</td>
                  <td>{order.total_order} €</td>
                  <td>{order.statut}</td>
                  <td>
                  <Link to={`/orderdetail/${order.id}`}>
                    <button type="button">Voir le détail</button>
                  </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      <Footer />
    </div>
  );
}

export default Orders;