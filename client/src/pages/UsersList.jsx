import { Link, useLoaderData } from "react-router-dom";
import Footer from "../components/Footer";
import "./UsersList.css";

function Users() {

  const users = useLoaderData();

  return (
    <div>
      <section className="fil-ariane">
        <Link to="/">
          <p type="button">Accueil ≻</p>
        </Link>
        <Link to="/dashboard">
          <p type="button">Tableau de bord ≻</p>
        </Link>
        <p>Utilisateurs</p>
      </section>
      <section className="user-list">
        <h3>Utilisateurs</h3>
        <table className="users-table">
          <thead>
            <tr>
              <th>Identifiant</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>E-mail</th>
              <th>Détail</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="user-item">
                <td>{user.id}</td>
                <td>{user.lastname}</td>
                <td>{user.firstname}</td>
                <td>{user.email}</td>
                <td>
                <Link to={`/userprofile/${user.id}`}>
                  <button type="button">Voir le profil</button>
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Footer />
    </div>
  );
}

export default Users;