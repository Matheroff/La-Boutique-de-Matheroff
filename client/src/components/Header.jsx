import { useState } from "react";
import "./Header.css";
import { Outlet, Link } from "react-router-dom";
import Cart from "../assets/images/cart.png";
import User from "../assets/images/user.png";
import Heart from "../assets/images/heart.png";
import Menu from "../assets/images/menu-burger.png";
import Login from "./Login";

function Header() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
};

const handleModalClose = () => {
    setIsModalOpen(false);
};

  return (
    <div className="header">
      <Link to="/">
        <h1 type="button">La Boutique de Matheroff</h1>
      </Link>
      <nav>
        <div className="navbar">
          <div className="menu-searchbar">
            <div className="img-title-text">
              <Link to="/">
                <img
                  src={Menu}
                  alt="Catégories"
                  type="button"
                />
              </Link>
              <span className="hover-text">Catégories</span>
            </div>
            <input
              className="search-input"
              type="text"
              placeholder="Que recherchez-vous ?"
            />
          </div>
          <div className="user-icons">
            <div className="img-title-text">
              <Link to="/userprofile">
                <img
                  src={User}
                  alt="Se connecter"
                  type="button"
                  aria-hidden="true"
                  onClick={handleModalOpen}
                />
              </Link>
              <span className="hover-text">Mon compte</span>
            </div>
            <div className="img-title-text">
              <Link to="/favorites">
                <img
                  src={Heart}
                  alt="Favoris"
                  type="button"
                />
              </Link>
              <span className="hover-text">Favoris</span>
            </div>
            <div className="img-title-text">
              <Link to="/cart">
                <img
                  src={Cart}
                  alt="Panier"
                />
              </Link>
              <span className="hover-text">Panier</span>
            </div>
          </div>
        </div>
        <Outlet />
      </nav>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span 
              className="close-button"
              aria-hidden="true"
              onClick={handleModalClose}>
              &times;
            </span>
            <h2>Connexion</h2>
            {/* <Login /> */}
            <p>Ma modale</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;


