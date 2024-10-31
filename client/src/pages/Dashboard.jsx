import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import "./Dashboard.css";

function Dashboard() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [order, setOrder] = useState([
        {
          id: 1,
          item_quantity: 3,
          total_order: 37.00,
          order_date: "30/10/2024",
          id_user: 3,
          statut: "En attente de validation",
        },
      ]);

    // Date actuelle
    const today = new Date();
    const formattedDate = today.toLocaleDateString("fr-FR");

    // Calcul de la date de livraison à +8 jours
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + 8);
    const formattedDeliveryDate = deliveryDate.toLocaleDateString("fr-FR");

    const openModal = (orderConfirmation) => {
        setOrderDetails(orderConfirmation);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setOrderDetails(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            <section className="fil-ariane">
                <Link to="/">
                    <p type="button">Accueil ≻</p>
                </Link>
                <Link to="/dashboard">
                <p>Tableau de bord ≻</p>
                </Link>
            </section>
            <h2>Bienvenue Matheroff</h2>
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
                                <th>{42} Articles</th>
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
                            <th>Numéro de commande</th>
                            <th>Utilisateur</th>
                            <th>Email</th>
                            <th>Nombre d'articles</th>
                            <th>Prix commande</th>
                            <th>Détail commande</th>
                            <th>Confirmation commande</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((orderDetail) => (
                            <tr key={orderDetail.id}>
                                <td>{orderDetail.id}</td>
                                <td>Aurore Garnier</td>
                                <td>aurore.garnier@outlook.com</td>
                                <td>3</td>
                                <td>37€</td>
                                <td>
                                <Link to="/orderdetail">
                                    <button type="button">Voir</button>
                                </Link>
                                </td>
                                <td>
                                    <button 
                                        type="button" 
                                        onClick={() => openModal(orderDetail)}
                                        >
                                            Confirmer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <Footer />
            {isModalOpen && (
                <div className="order-valid-modal">
                    <div className="order-valid-modal-content">
                        <h3>Confirmation de la commande</h3>
                        {orderDetails && (
                            <div>
                                <p><strong>Message à </strong> {orderDetails.user}</p>
                                <p>Votre commande est confirmée. Vous la recevrez le {formattedDeliveryDate}. <br/>
                                La Boutique de Matheroff vous remercie et vous souhaite une bonne réception !</p>
                            </div>
                        )}
                        <button type="button" className="grey-button" onClick={closeModal}>Annuler</button>
                        <button type="button" >Confirmer</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
