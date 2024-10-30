import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "./Dashboard.css";

function Dashboard() {


    return (

        <div>
            <section className="fil-ariane">
                <Link to="/">
                    <p type="button">Accueil ≻</p>
                </Link>
                <p>Tableau de bord ≻</p>
            </section>
            <h2>Bienvenue Mathieu</h2>
            <section className="dashboard-flex">
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>{6} Catégories</th>
                                <Link to="/categories">
                                <button type="button">Voir tout</button>
                                </Link>
                            </tr>
                            <tr>
                                <th>{6} Thèmes</th>
                                <Link to="/themes">
                                <button type="button">Voir tout</button>
                                </Link>
                            </tr>
                            <tr>
                                <th>{41} Articles</th>
                                <Link to="/items">
                                <button type="button">Voir tout</button>
                                </Link>
                            </tr>
                            <tr>
                                <th>{3} Utilisateurs</th>
                                <Link to="/users">
                                <button type="button">Voir tout</button>
                                </Link>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div>
                    <p>* Vous avez {5} nouvelles commandes à confirmer</p>
                    <p>* {1} nouvel utilisateur cette semaine</p>
                </div>
            </section>
            <section className="order-table">
                <table>
                    <thead>
                        <tr>
                            <th>Utilisateur</th>
                            <th>Email</th>
                            <th>Nombre d'articles</th>
                            <th>Prix commande</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Aurore Garnier</td>
                            <td>aurore.garnier@outlook.com</td>
                            <td>3</td>
                            <td>37€</td>
                            <button type="button">Voir</button>
                        </tr>
                    </tbody>
                </table>
            </section>
            <Footer />
        </div>
    )
}

export default Dashboard;