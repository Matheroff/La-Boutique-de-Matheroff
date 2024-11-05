import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";
import Cart from "../assets/images/cart.png";
import Userlocked from "../assets/images/userlocked1.png";
import User from "../assets/images/user.png";
import Heart from "../assets/images/heart.png";
import Shop from "../assets/images/shop.png";
import AuthModal from "./AuthModal";
import myAxios from "../services/myAxios"; // Import pour récupérer le panier

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0); // Compteur d'articles dans le panier

  const myUser = JSON.parse(localStorage.getItem("myUser"));

  useEffect(() => {
    if (myUser) {
      myAxios.get(`/api/carts`).then((response) => {
        // Filtrer les résultats pour ne conserver que ceux correspondant à l'utilisateur connecté
        const filteredCart = response.data.filter(item => item.id_user === myUser.id);
        setCartItemCount(filteredCart.length);
      });
    }
  }, [myUser]);

  useEffect(() => {
    if (searchTerm) {
      navigate(`/shop/search/${searchTerm}`);
    }
  }, [searchTerm, navigate]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearchTerm(event.target.value);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleProtectedNavigation = (event, path) => {
    if (!myUser) {
      event.preventDefault();
      handleModalOpen();
    } else {
      navigate(path);
    }
  };

  return (
    <div className="header">
      <Link to='/'>
        <h1>La Boutique de Matheroff</h1>
      </Link>
      <nav>
        <div className="navbar">
          <div className="menu-searchbar">
            <div className="img-title-text">      
              <Link to="/shop">
                <img src={Shop} alt="Boutique" />
              </Link>
              <span className="hover-text">Boutique</span>
            </div>
            <input
              className="search-input"
              type="text"
              placeholder="Que recherchez-vous ?"
              onKeyUp={handleKeyDown}
            />
          </div>
          <div className="user-icons">
            {/* Afficher l'icône Userlocked si aucun utilisateur n'est connecté */}
            {!myUser ? (
              <div className="img-title-text">
                <img
                  src={Userlocked}
                  alt="Se connecter"
                  aria-hidden="true"
                  onClick={handleModalOpen}
                />
                <span className="hover-text">Mon compte</span>
              </div>
            ) : (
              // Afficher l'icône User si un utilisateur est connecté
              <div className="img-title-text">
                <Link to="/userprofile">
                  <img
                    src={User}
                    alt="Mon profil"
                  />
                </Link>
                <span className="hover-text">Mon compte</span>
              </div>
            )}
            <div className="img-title-text">      
              <a href="/favorites" onClick={(e) => handleProtectedNavigation(e, '/favorites')}>
                <img src={Heart} alt="Favoris" />
              </a>
              <span className="hover-text">Favoris</span>
            </div>
            <div className="img-title-text cart-icon">
              <a href="/cart" onClick={(e) => handleProtectedNavigation(e, '/cart')}>
                <img src={Cart} alt="Panier" />
                {cartItemCount > 0 && <span className="cart-notification"></span>}
              </a>
              <span className="hover-text">Panier</span>
            </div>
          </div>
        </div>
        <Outlet />
      </nav>
      <AuthModal 
         isOpen={isModalOpen}
         onClose={handleModalClose} 
       />
    </div>
  );
}

export default Header;
