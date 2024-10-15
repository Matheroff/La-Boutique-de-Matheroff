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

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          navigate();
        }
      };

    return (
        <div className="column">
            <section className="fil-ariane">
                <p
                    type="button"
                    onClick={() => navigate("/")}
                    aria-hidden="true"
                    onKeyUp={handleKeyDown}
                >
                    Accueil ≻
                </p>
                <p
                    type="button"
                    onClick={() => navigate("/admin")}
                    aria-hidden="true"
                    onKeyUp={handleKeyDown}
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
                        onKeyUp={handleKeyDown}
                    >
                        Editer/Modifier
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/item/${item.id}`)}
                        aria-hidden="true"
                        onKeyUp={handleKeyDown}
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