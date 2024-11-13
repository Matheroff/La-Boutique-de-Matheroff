import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../components/Footer";
import "./Dashboard.css";
import myAxios from "../services/myAxios";

function Dashboard() {

    const navigate = useNavigate();

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
    // Calcul de la date de livraison à +8 jours
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + 8);
    const formattedDeliveryDate = deliveryDate.toLocaleDateString("fr-FR");

    const openModal = (user, order) => {
        const mergedObj = { ...user, ...order };
        setOrderDetails(mergedObj);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setOrderDetails(null);
        setIsModalOpen(false);
    };

    const handleSubmit = async (orderDetail, e) => {
        e.preventDefault();
        try {
            const orderDdate = new Date(orderDetail.order_date);
            await myAxios.put(`/api/orders/${orderDetail.id}`, 
                { 
                    ...orderDetail,
                    order_date: orderDdate.toISOString().slice(0, 19).replace('T', ' '),
                    statut: 'Confirmée', 
                    confirmation_date: new Date().toISOString().split('T')[0] + ' 00:00:00'
                }
            );
            closeModal();
            navigate("/orderslist");
        } catch (error) {
          console.error("Erreur lors du changement de statut:", error);
          toast.error("Une erreur est survenue lors de la mise à jour du statut !");
        }
      };

    // infos pour l'envoi de mail

    const sendConfirmationEmail = (orderDetails) => {
        console.log('envoi mail')
        console.log(orderDetails)
        const templateParams = {
          user_name: `${orderDetails.firstname} ${orderDetails.lastname}`,
          user_email: orderDetails.email,
          order_id: orderDetails.id,
          delivery_date: formattedDeliveryDate,
        };
      
        const emailjsUrl = 'https://api.emailjs.com/api/v1.0/email/send'; // L'URL de l'API EmailJS
      
        const data = {
          service_id: 'service_iyc0n4g', // Ton ID de service EmailJS
          template_id: 'template_3lzr8ie', // Ton ID de template EmailJS
          user_id: '5ngfx5VxPRrmqexr9', // Ton User ID EmailJS
          template_params: templateParams,
        };
      
        fetch(emailjsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => {
            if (response.ok) {
              console.log('Email envoyé avec succès');
              toast.success("Email de confirmation envoyé !");
            } else {
              console.error('Erreur lors de l\'envoi de l\'email', response);
              toast.error("Erreur lors de l'envoi de l'email !");
            }
          })
          .catch((error) => {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            toast.error("Erreur lors de l'envoi de l'email !");
          });
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
            {newOrders.length === 0 ? (
                <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                        Aucune commande en attente de validation
                    </td>
                </tr>
            ) : (
                newOrders.map((order) => {
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
                                <button type="button" onClick={() => openModal(userAssociated, order)}>
                                    Confirmer
                                </button>
                            </td>
                        </tr>
                    );
                })
            )}
        </tbody>
    </table>
</section>
            <ToastContainer />
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
                        {/* <button type="button" onClick={(e) => handleSubmit(orderDetails, e)}>Confirmer</button> */}
                        <button type="button" onClick={(e) => {
                            handleSubmit(orderDetails, e)
                            sendConfirmationEmail(orderDetails)
                        }}>Confirmer</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;




// import { Link, useLoaderData, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Footer from "../components/Footer";
// import { ToastContainer, toast } from "react-toastify";
// import "./Dashboard.css";
// import myAxios from "../services/myAxios";

// function Dashboard() {

//     const navigate = useNavigate();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [orderDetails, setOrderDetails] = useState(null);
//     const [orders, users, categories, themes, items] = useLoaderData();

//     // Filtre sur les commandes de l'utilisateur
//     const [newOrders, setNewOrders] = useState (
//         orders
//             .filter((order) => order.statut === "En attente de validation")
//             .map((order) => ({...order}))
//     );

//     // Date actuelle
//     const today = new Date();
//     // Calcul de la date de livraison à +8 jours
//     const deliveryDate = new Date();
//     deliveryDate.setDate(today.getDate() + 8);
//     const formattedDeliveryDate = deliveryDate.toLocaleDateString("fr-FR");

//     const openModal = (user, order) => {
//         const mergedObj = { ...user, ...order };
//         setOrderDetails(mergedObj);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setOrderDetails(null);
//         setIsModalOpen(false);
//     };

//     const handleSubmit = async (orderDetail, e) => {
//         e.preventDefault();
//         try {
//             const orderDdate = new Date(orderDetail.order_date);
//             await myAxios.put(`/api/orders/${orderDetail.id}`, 
//                 { 
//                     ...orderDetail,
//                     order_date: orderDdate.toISOString().slice(0, 19).replace('T', ' '),
//                     statut: 'Validée', 
//                     confirmation_date: new Date().toISOString().split('T')[0] + ' 00:00:00'
//                 }
//             );
//             closeModal();
//             navigate("/orderslist");
//         } catch (error) {
//           console.error("Erreur lors du changement de statut:", error);
//           toast.error("Une erreur est survenue lors de la mise à jour du statut !");
//         }
//       };

//           // infos pour l'envoi de mail
//     const subject = "confirmation commande";
//     const body = "Bonjour,\n\nVotre commande a été validée.";

//     const sendConfirmationEmail = (orderDetails) => {
//         console.log('envoi mail')
//         console.log(orderDetails)
//         const templateParams = {
//           user_name: `${orderDetails.firstname} ${orderDetails.lastname}`,
//           user_email: orderDetails.email,
//           order_id: orderDetails.id,
//           delivery_date: formattedDeliveryDate,
//         };
      
//         const emailjsUrl = 'https://api.emailjs.com/api/v1.0/email/send'; // L'URL de l'API EmailJS
      
//         const data = {
//           service_id: 'service_iyc0n4g', // Ton ID de service EmailJS
//           template_id: 'template_3lzr8ie', // Ton ID de template EmailJS
//           user_id: '5ngfx5VxPRrmqexr9', // Ton User ID EmailJS
//           template_params: templateParams,
//         };
      
//         fetch(emailjsUrl, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         })
//           .then(response => {
//             if (response.ok) {
//               console.log('Email envoyé avec succès');
//               toast.success("Email de confirmation envoyé !");
//             } else {
//               console.error('Erreur lors de l\'envoi de l\'email', response);
//               toast.error("Erreur lors de l'envoi de l'email !");
//             }
//           })
//           .catch((error) => {
//             console.error('Erreur lors de l\'envoi de l\'email:', error);
//             toast.error("Erreur lors de l'envoi de l'email !");
//           });
//       };

//       return (
//         <div>
//             <section className="fil-ariane">
//                 <Link to="/">
//                     <p type="button">Accueil ≻</p>
//                 </Link>
//                 <Link to="/dashboard">
//                 <p>Tableau de bord ≻</p>
//                 </Link>
//             </section>
//             <h2>Bienvenue Matheroff</h2>
//             <section className="dashboard-flex">
//                 <div>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>{categories.length} Catégories</th>
//                                 <Link to="/categories">
//                                 <button type="button">Voir tout</button>
//                                 </Link>
//                             </tr>
//                             <tr>
//                                 <th>{themes.length} Thèmes</th>
//                                 <Link to="/themes">
//                                 <button type="button">Voir tout</button>
//                                 </Link>
//                             </tr>
//                             <tr>
//                                 <th>{items.length} Articles</th>
//                                 <Link to="/items">
//                                 <button type="button">Voir tout</button>
//                                 </Link>
//                             </tr>
//                             <tr>
//                                 <th>{users.length} Utilisateurs</th>
//                                 <Link to="/users">
//                                 <button type="button">Voir tout</button>
//                                 </Link>
//                             </tr>
//                         </thead>
//                     </table>
//                 </div>
//                 <div className="right-dashboard">
//                 <p>Vous avez <strong>{newOrders.length}</strong> nouvelle{newOrders.length !== 1 ? 's' : ''} commande{newOrders.length !== 1 ? 's' : ''} à confirmer</p>
//                 <Link to="/orderslist">
//                     <button type="button">Voir toutes les commandes ({orders.length})</button>
//                 </Link>
//                 </div>
//             </section>
//             <section className="order-table">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Numéro de commande</th>
//                             <th>Date</th>
//                             <th>Utilisateur</th>
//                             <th>Email</th>
//                             <th>Nombre d'articles</th>
//                             <th>Prix</th>
//                             <th>Détail</th>
//                             <th>Etat commande</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                     {newOrders.map((order) => {
//                         const userAssociated = users.find(user => user.id === order.id_user);
//                         return (
//                             <tr key={order.id}>
//                                 <td>{order.id}</td>
//                                 <td>{new Date(order.order_date).toLocaleDateString('fr-FR')}</td>
//                                 <td>{userAssociated ? `${userAssociated.firstname} ${userAssociated.lastname}` : "Utilisateur non trouvé"}</td>
//                                 <td>{userAssociated ? userAssociated.email : "Email non disponible"}</td>
//                                 <td>{order.item_quantity}</td>
//                                 <td>{order.total_order} €</td>
//                                 <td>
//                                     <Link to={`/orderdetailadmin/${order.id}`}>
//                                         <button type="button">Voir</button>
//                                     </Link>
//                                 </td>
//                                 <td>
//                                     <button type="button" onClick={() => openModal(userAssociated, order)}>
//                                     Confirmer
//                                     </button>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                     </tbody>
//                 </table>
//             </section>
//             <Footer />
//             {isModalOpen && (
//                 <div className="order-valid-modal">
//                     <div className="order-valid-modal-content">
//                         <h3>Confirmer cette commande ?</h3>
//                         {orderDetails && (
//                             <div>
//                                 <p>Message à <strong>{orderDetails.email}</strong> :</p>
//                                 <p>Votre commande est confirmée. Vous la recevrez aux alentours du <strong>{formattedDeliveryDate}</strong>. <br/>
//                                 La Boutique de Matheroff vous remercie et vous souhaite une bonne réception !</p>
//                             </div>
//                         )}
//                         <button type="button" className="grey-button" onClick={closeModal}>Annuler</button>
//                         {/* <button type="button" onClick={(e) => handleSubmit(orderDetails, e)}>Confirmer</button> */}
//                         <button type="button" onClick={(e) => {
//                             handleSubmit(orderDetails, e)
//                             sendConfirmationEmail(orderDetails)
//                         }}>Confirmer</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Dashboard;
