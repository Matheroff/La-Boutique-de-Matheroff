import { Link } from "react-router-dom";
import { useState } from "react";
import "./Order.css";
import Footer from "../components/Footer";
import EmptyOrder from "../components/EmptyOrder";

function Users() {

  const [users, setUsers] = useState([
    {
      id: 1,
      user_date: "23/10/2024",
      item_quantity: 1,
      total_user: 10.00,
      id_user: 1,
      statut: 1
    },
    {
      id: 2,
      user_date: "25/10/2024",
      item_quantity: 1,
      total_user: 10.00,
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
      <section className="user-info">
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
      {users.length === 0 ? (
        <Emptyuser />
      ) : (
        <section className="user-list">
          <table className="users-table">
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
              {users.map((user) => (
                <tr key={user.id} className="user-item">
                  <td>{user.id}</td>
                  <td>{user.user_date}</td>
                  <td>{user.item_quantity} article</td>
                  <td>{user.total_user} €</td>
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

export default Users;