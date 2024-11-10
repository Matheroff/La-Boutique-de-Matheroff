import { Link, useLoaderData } from "react-router-dom";
import "./Orders.css";
import Footer from "../components/Footer";
import EmptyOrder from "../components/EmptyOrder";

function OrdersList() {

  const [orders, users] = useLoaderData();

  return (
    <div>
      <section className="fil-ariane">
        <Link to="/">
          <p type="button">Accueil ≻</p>
        </Link>
        <Link to="/dashboard">
          <p type="button">Tableau de bord ≻</p>
        </Link>
        <p>Commandes</p>
      </section>
      <section className="order-info">
        <h3>Toutes les commandes</h3>
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
                <th>Utilisateur</th>
                <th>Email</th>
                <th>Nombre d'articles</th>
                <th>Prix</th>
                <th>Statut</th>
                <th>Détail</th>
              </tr>
            </thead>
            <tbody>
            {orders.map((order) => {
              const userAssociated = users.find(user => user.id === order.id_user);
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{new Date(order.order_date).toLocaleDateString('fr-FR')}</td>
                    <td>{userAssociated ? `${userAssociated.firstname} ${userAssociated.lastname}` : "Utilisateur non trouvé"}</td>
                    <td>{userAssociated ? userAssociated.email : "Email non disponible"}</td>
                    <td>{order.item_quantity}</td>
                    <td>{order.total_order} €</td>
                    <td>{order.statut}</td>
                    <td>
                      <Link to={`/orderdetailadmin/${order.id}`}>
                        <button type="button">Voir</button>
                      </Link>
                    </td>
                  </tr>
                  );
              })}
            </tbody>
          </table>
        </section>
      )}
      <Footer />
    </div>
  );
}

export default OrdersList;