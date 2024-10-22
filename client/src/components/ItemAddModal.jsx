import { useEffect, useState } from "react";
import { useNavigate, useLoaderData, Form } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types";
import myAxios from "../services/myAxios";
import "./ItemAddModal.css";

Modal.setAppElement("#root");

function ItemAddModal({ isOpen, onRequestClose, action, item = {} }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    unit_price: 0,
    category: '',
    theme: ''
  });

  const list = useLoaderData();

  useEffect(() => {
    if ((action === "update" || action === "delete") && item) {
      console.info(item);
      setFormData({
        name: item.name || '',
        description: item.description || '',
        image: item.image || '',
        unit_price: item.unit_price || 0,
        category: item.id_category || '',
        theme: item.id_theme || ''
      });
    } else if (action === "add") {
      setFormData({
        name: '',
        description: '',
        image: '',
        unit_price: 0,
        category: '',
        theme: ''
      });
      console.info(formData);
    }
  }, [action, item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === "add") {
        const response = await myAxios.post("/api/items", formData);
        navigate(`/item/${response.data.insertId}`);
        toast.success("Article ajouté avec succès !");
      } else if (action === "update") {
        await myAxios.put(`/api/items/${item.id}`, formData);
        navigate(`/items`);
        toast.success("Article mis à jour avec succès !");
      } else if (action === "delete") {
        await myAxios.delete(`/api/items/${item.id}`);
        navigate("/items");
        toast.success("Article supprimé avec succès !");
      }
    } catch (error) {
      console.error("Erreur lors du traitement de l'article:", error);
      toast.error("Une erreur est survenue lors de la soumission !");
    }
    onRequestClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        {action && (action === "add" || action === "update") ? 
          (<div className="modal-add-item">
            <h2>{action === "add" ? "Créer un article" : "Editer / Modifier un article"}</h2>
            <Form method="post" className="form-add-item" onSubmit={handleSubmit}>
              <label htmlFor="name">
                Nom:
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="description">
                Description:
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="image">
                Image (url):
                <input
                  type="url"
                  name="image"
                  id="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="unit_price">
                Prix:
                <input
                  type="number"
                  name="unit_price"
                  id="unit_price"
                  value={formData.unit_price}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="category">
                Catégorie:
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">---</option>
                  {list[1].map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
                  ))}
                </select>
              </label>
              <label htmlFor="theme">
                Thème:
                <select
                  name="theme"
                  id="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  required
                >
                  <option value="">---</option>
                  {list[2].map((theme) => (
                    <option key={theme.id} value={theme.id}>{theme.name}</option>
                  ))}
                </select>
              </label>
              <div className="modal-buttons">
                <button type="submit">{action === "add" ? "Ajouter" : "Modifier"}</button>
                <button className="grey-button" type="button" onClick={onRequestClose}>Annuler</button>
              </div>
            </Form>
          </div>) 
          : (
          <div className="modal-delete-item">
            <h3>Êtes-vous sûr de vouloir supprimer cet article ?</h3>
            {item.image && <img src={item.image} alt={item.name} className="item-delete-image" />}
            {item.name && <p>{item.name}</p>}
            <div className="modal-buttons">
              <button type="button" onClick={handleSubmit}>Supprimer</button>
              <button className="grey-button" type="button" onClick={onRequestClose}>Annuler</button>
            </div>
          </div>)
        }
      </Modal>
      <ToastContainer />
    </>
  );
}

ItemAddModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default ItemAddModal;



