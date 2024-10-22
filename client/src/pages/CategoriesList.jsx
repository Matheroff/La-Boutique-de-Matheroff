import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer";
import myAxios from "../services/myAxios";
import "./Lists.css";

function CategoriesList() {
    const categories = useLoaderData();
    const [formData, setFormData] = useState({
        name: "",
    });
    const [editingCategory, setEditingCategory] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
    });
    const [categoryList, setCategoryList] = useState(categories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await myAxios.post("/api/categories", {
                name: formData.name,
            });
            console.info("Category added:", response.data);
            setCategoryList([...categoryList, response.data]);
            setFormData({ name: "" }); // Réinitialise le formulaire
            toast.success("Catégorie ajoutée avec succès!");
        } catch (err) {
            console.error("Error adding category:", err);
            toast.error("Erreur lors de l'ajout de la catégorie.");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await myAxios.delete(`/api/categories/${id}`);
            console.info("Category deleted:", response.data);
            setCategoryList(categoryList.filter((category) => category.id !== id));
            toast.success("Catégorie supprimée avec succès!");
        } catch (err) {
            console.error("Error deleting category:", err);
            toast.error("Erreur lors de la suppression de la catégorie.");
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category.id);
        setEditFormData({ name: category.name });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.info("Updating category:", editingCategory);
        try {
            const response = await myAxios.put(`/api/categories/${editingCategory}`, {
                name: editFormData.name,
            });
            console.info("Category updated:", response.data);
            setCategoryList(categoryList.map((category) =>
                category.id === editingCategory ? { ...category, name: editFormData.name } : category
            ));
            setEditingCategory(null);
            toast.success("Catégorie mise à jour avec succès!");
        } catch (err) {
            console.error("Error updating category:", err);
            toast.error("Erreur lors de la mise à jour de la catégorie.");
        }
    };

    const openModal = (category) => {
        setCategoryToDelete(category);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCategoryToDelete(null);
        setIsModalOpen(false);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            handleDelete(categoryToDelete.id);
            closeModal();
        }
    };

    return (
        <div>
            <ToastContainer />
            <section className="fil-ariane">
                <Link to="/">
                    <p type="button">Accueil ≻</p>
                </Link>
                <Link to="/">
                    <p type="button">Tableau de bord ≻</p>
                </Link>
                <p>Catégories</p>
            </section>
            <section className="add-category-theme">
                <h3>Catégories</h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex-row">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nouvelle catégorie"
                        />
                        <button type="submit">Ajouter</button>
                    </div>
                </form>
            </section>
            <section>
                {categoryList.map((category) => (
                    <div className="row-list" key={category.id}>
                        {editingCategory === category.id ? (
                            <form onSubmit={handleUpdate}>
                                <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleEditChange}
                                />
                                <button type="submit">Mettre à jour</button>
                            </form>
                        ) : (
                            <>
                                <p>{category.name}</p>
                                <button type="button" onClick={() => handleEdit(category)}>
                                    Modifier
                                </button>
                                <button type="button" onClick={() => openModal(category)}>
                                    Supprimer
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </section>
            <Footer />
            {isModalOpen && (
                <div className="new-add-modal">
                    <div className="new-add-modal-content">
                        <p>Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
                        <div className="modal-buttons">
                            <button 
                                type="button" 
                                onClick={confirmDelete}
                            >
                                Supprimer
                            </button>
                            <button 
                                className="grey-button" 
                                type="button" 
                                onClick={closeModal}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoriesList;






