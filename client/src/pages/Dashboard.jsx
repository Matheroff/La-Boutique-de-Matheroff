import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import "./Dashboard.css";

function Dashboard() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [orders, users, categories, themes, items] = useLoaderData();

    // Filtre sur les commandes de l'utilisateur
    const [newOrders, setNewOrders] = useState (
        orders
            .filter((order) => order.statut === "En attente de validation")
            .map((order) => ({...order}))
    );

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
                                <th>{categories.length} Catégories</th>
                                <Link to="/categories">
                                <button type="button">Voir tout</button>
                                </Link>
                            </tr>
                            <tr>
                                <th>{themes.length} Thèmes</th>
                                <Link to="/themes">
                                <button type="button">Voir tout</button>
                                </Link>
                            </tr>
                            <tr>
                                <th>{items.length} Articles</th>
                                <Link to="/items">
                                <button type="button">Voir tout</button>
                                </Link>
                            </tr>
                            <tr>
                                <th>{users.length} Utilisateurs</th>
                                <Link to="/users">
                                <button type="button">Voir tout</button>
                                </Link>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="right-dashboard">
                <p>Vous avez <strong>{newOrders.length}</strong> nouvelle{newOrders.length !== 1 ? 's' : ''} commande{newOrders.length !== 1 ? 's' : ''} à confirmer</p>
                <Link to="/orderslist">
                    <button type="button">Voir toutes les commandes ({orders.length})</button>
                </Link>
                </div>
            </section>
            <section className="order-table">
                <table>
                    <thead>
                        <tr>
                            <th>Numéro de commande</th>
                            <th>Date</th>
                            <th>Utilisateur</th>
                            <th>Email</th>
                            <th>Nombre d'articles</th>
                            <th>Prix</th>
                            <th>Détail</th>
                            <th>Etat commande</th>
                        </tr>
                    </thead>
                    <tbody>
                    {newOrders.map((order) => {
                        const userAssociated = users.find(user => user.id === order.id_user);
                        return (
                            <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{new Date(order.order_date).toLocaleDateString('fr-FR')}</td>
                            <td>{userAssociated ? `${userAssociated.firstname} ${userAssociated.lastname}` : "Utilisateur non trouvé"}</td>
                            <td>{userAssociated ? userAssociated.email : "Email non disponible"}</td>
                            <td>{order.item_quantity}</td>
                            <td>{order.total_order} €</td>
                            <td>
                                <Link to={`/orderdetailadmin/${order.id}`}>
                                    <button type="button">Voir</button>
                                </Link>
                            </td>
                            <td>
                                <button type="button" onClick={() => openModal(userAssociated)}>
                                Confirmer
                                </button>
                            </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </section>
            <Footer />
            {isModalOpen && (
                <div className="order-valid-modal">
                    <div className="order-valid-modal-content">
                        <h3>Confirmer cette commande ?</h3>
                        {orderDetails && (
                            <div>
                                <p>Message à <strong>{orderDetails.email}</strong> :</p>
                                <p>Votre commande est confirmée. Vous la recevrez aux alentours du <strong>{formattedDeliveryDate}</strong>. <br/>
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
