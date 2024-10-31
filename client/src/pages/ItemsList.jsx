import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import "./Lists.css";
import Footer from "../components/Footer";
import ItemAddModal from "../components/ItemAddModal";

function ItemsList() {
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [action, setAction] = useState("");
    const [item, setItem] = useState({});
    const items = useLoaderData();

    return (
        <div className="column">
            <section className="fil-ariane">
                <Link to="/">
                    <p>Accueil ≻</p>
                </Link>
                <Link to="/dashboard">
                    <p>Tableau de bord ≻</p>
                </Link>
                <p>Articles</p>
            </section>
            <div className="create-item-button">
                <h3>Articles</h3>
                <button
                    type="button" 
                    onClick={() => {
                        setModalIsOpen(true)
                        setAction("add")
                    }}
                >
                    Créer un nouvel article
                </button>
            </div>
            <section className="grid-items-admin">
            {items[0].map((item) => (
                <div 
                    key={item.id}> 
                    <img src={item.image} alt="Article"/>
                    <p>{item.name}</p>
                    <button
                        type="button"
                        onClick={() => {
                            setModalIsOpen(true)
                            setAction("update")
                            setItem(item)
                        }}
                    >
                        Editer/Modifier
                    </button>
                    <button
                        type="button"
                        onClick={() => { 
                            setModalIsOpen(true)
                            setAction("delete")
                            setItem(item)
                        }}
                    >
                        Supprimer
                    </button>
                </div>
            ))}
            </section>
            <Footer />
            <ItemAddModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                action={action}
                item={item}
            /> 
        </div>
    )
}

export default ItemsList;