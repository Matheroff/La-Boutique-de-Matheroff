import { useState } from "react";
import { useNavigate, useLoaderData, Form } from "react-router-dom";
import Modal from "react-modal";
import PropTypes from "prop-types";
import myAxios from "../services/myAxios";
import "./ItemAddModal.css";

Modal.setAppElement("#root");
function ItemAddModal({ isOpen, onRequestClose }) {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    unit_price: 0,
    category: 0,
    theme: 0
  });

  const list = useLoaderData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await myAxios.post("/api/items", formData);
      console.info(response)
      navigate(`/item/${response.data.insertId}`);
      
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article:", error);
    }
    onRequestClose(); 
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="modal-add-item">
        <h2>Créer un article</h2>
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
            <button type="submit">Ajouter</button>
            <button className="grey-button" type="button" onClick={onRequestClose}>Annuler</button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

ItemAddModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default ItemAddModal;

