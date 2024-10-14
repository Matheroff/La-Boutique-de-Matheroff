import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import "./Lists.css";

function CategoriesList() {

    const categories = useLoaderData();
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          navigate();
        }
      };

    const [formData, setFormData] = useState({
        category: "",
    });
       
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      
    const handleSubmit = (e) => {
        e.preventDefault();
        console.info("Form Data Submitted:", formData);
      };

    return (
        <div>
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
                <p>Catégories</p>
            </section>
            <section className="add-category-theme" onSubmit={handleSubmit}>
                <h3>Catégories</h3>
                <div className="flex-row">
                    <input
                        type="text"
                        name="nom"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nouvelle catégorie"
                    />
                    <button
                        type="submit"
                        onKeyUp={handleKeyDown}
                    >
                        Ajouter
                    </button>
                </div>
            </section>
            <section>
            {categories.map((category) => (
                <div className="row-list"
                    key={category.id}>
                    <p>{category.name}</p>
                    <button
                        type="button"
                        onClick={() => navigate("/category/:id")}
                        onKeyUp={handleKeyDown}
                    >
                        Modifier
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/category/:id")}
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

export default CategoriesList;