import { useLoaderData, Link } from "react-router-dom";
import "./OrderDetail.css";
import Footer from "../components/Footer";

function OrderDetail() {

    const [order, item, items] = useLoaderData(); // importer table user_order

    return(
        <div>
            <section className="fil-ariane">
              <Link to="/">
                <p type="button">Accueil ≻</p>
              </Link>
              <Link to="/userprofile">
                <p type="button">Mon profil ≻</p>
              </Link>
              <p>Détail de ma commande</p>
            </section>
            <section className="order-detail">
                <div className="image-container">
                    <img src={item.image} alt={item.name} />
                </div>
                <div>
                    <h3>{order.id}</h3>
                    <h3>{order.total_price} €</h3>
                    <p>Nombre d'articles : {order.item_quantity}</p>
                </div>    
                <div>
                    <p>En attente de confirmation</p>
                    <p>Confirmée</p>
                    <p>Livrée</p>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default OrderDetail;