import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer";
import myAxios from "../services/myAxios";
import "./Lists.css";

function ThemesList() {
    const themes = useLoaderData();
    const [formData, setFormData] = useState({
        name: "",
    });
    const [editingTheme, setEditingTheme] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
    });
    const [themeList, setThemeList] = useState(themes);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [themeToDelete, setThemeToDelete] = useState(null);

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
            const response = await myAxios.post("/api/themes", {
                name: formData.name,
            });
            console.info("Theme added:", response.data);
            setThemeList([...themeList, response.data]);
            setFormData({ name: "" }); // Réinitialise le formulaire
            toast.success("Thème ajouté avec succès!");
        } catch (err) {
            console.error("Error adding theme:", err);
            toast.error("Erreur lors de l'ajout du thème.");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await myAxios.delete(`/api/themes/${id}`);
            console.info("Theme deleted:", response.data);
            setThemeList(themeList.filter((theme) => theme.id !== id));
            toast.success("Thème supprimé avec succès!");
        } catch (err) {
            console.error("Error deleting theme:", err);
            toast.error("Erreur lors de la suppression du thème.");
        }
    };

    const handleEdit = (theme) => {
        setEditingTheme(theme.id);
        setEditFormData({ name: theme.name });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.info("Updating theme:", editingTheme);
        try {
            const response = await myAxios.put(`/api/themes/${editingTheme}`, {
                name: editFormData.name,
            });
            console.info("theme updated:", response.data);
            setThemeList(themeList.map((theme) =>
                theme.id === editingTheme ? { ...theme, name: editFormData.name } : theme
            ));
            setEditingTheme(null);
            toast.success("CThème mis à jour avec succès!");
        } catch (err) {
            console.error("Error updating theme:", err);
            toast.error("Erreur lors de la mise à jour du thème.");
        }
    };

    const openModal = (theme) => {
        setThemeToDelete(theme);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setThemeToDelete(null);
        setIsModalOpen(false);
    };

    const confirmDelete = () => {
        if (themeToDelete) {
            handleDelete(themeToDelete.id);
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
                <p>Thèmes</p>
            </section>
            <section className="add-category-theme">
                <h3>Thèmes</h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex-row">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nouveau thème"
                        />
                        <button type="submit">Ajouter</button>
                    </div>
                </form>
            </section>
            <section>
                {themeList.map((theme) => (
                    <div className="row-list" key={theme.id}>
                        {editingTheme === theme.id ? (
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
                                <p>{theme.name}</p>
                                <button type="button" onClick={() => handleEdit(theme)}>
                                    Modifier
                                </button>
                                <button type="button" onClick={() => openModal(theme)}>
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
                        <p>Êtes-vous sûr de vouloir supprimer ce thème ?</p>
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

export default ThemesList;

