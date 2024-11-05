import { Link } from "react-router-dom";
import { useState } from "react";
import "./Orders.css";
import Footer from "../components/Footer";
import EmptyOrder from "../components/EmptyOrder";

function Orders() {

  const [orders, setOrders] = useState([
    {
      id: 1,
      order_date: "23/10/2024",
      item_quantity: 1,
      total_order: 10.00,
      id_user: 1,
      statut: 1
    },
    {
      id: 2,
      order_date: "25/10/2024",
      item_quantity: 1,
      total_order: 10.00,
      id_user: 1,
      statut: 1
    },
  ]);

  return (
    <div>
      <section className="fil-ariane">
        <Link to="/">
          <p type="button">Accueil ≻</p>
        </Link>
        <Link to="/userprofile">
          <p type="button">Mon profil ≻</p>
        </Link>
        <p>Commandes</p>
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
                <th>Quantité d'articles</th>
                <th>Total</th>
                <th>Détail commande</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="order-item">
                  <td>{order.id}</td>
                  <td>{order.order_date}</td>
                  <td>{order.item_quantity} article</td>
                  <td>{order.total_order} €</td>
                  <td>
                  <Link to="/orderdetail">
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