import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./Home.css";
import "./Lists.css";
import Footer from "../components/Footer";
import ItemAddModal from "../components/ItemAddModal";

function ItemsList() {
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const items = useLoaderData();
    const navigate = useNavigate();

    return (
        <div className="column">
            <section className="fil-ariane">
                <p
                    type="button"
                    onClick={() => navigate("/")}
                    aria-hidden="true"
                >
                    Accueil ≻
                </p>
                <p
                    type="button"
                    onClick={() => navigate("/admin")}
                    aria-hidden="true"
                >
                    Tableau de bord ≻
                </p>
                <p>Articles</p>
            </section>
            <div className="create-item-button">
                <h3>Articles</h3>
                <button
                    type="button" 
                    onClick={() => setModalIsOpen(true)}
                >
                    Créer un nouvel article
                </button>
                <ItemAddModal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                /> 
            </div>
            <section className="grid-articles">
            {items[0].map((item) => (
                <div
                    key={item.id}> 
                    <img src={item.image} alt="Article"/>
                    <p>{item.name}</p>
                    <button
                        type="button"
                        onClick={() => navigate(`/item/${item.id}`)}
                    >
                        Editer/Modifier
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/item/${item.id}`)}
                    >
                        Supprimer
                    </button>
                </div>
            ))}
            </section>
            <Footer />
        </div>
    )
}

export default ItemsList;