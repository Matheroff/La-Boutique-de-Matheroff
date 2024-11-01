import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";
import Cart from "../assets/images/cart.png";
import Userlocked from "../assets/images/userlocked1.png";
import Heart from "../assets/images/heart.png";
import Menu from "../assets/images/menu-burger.png";
import AuthModal from "./AuthModal";
import myAxios from "../services/myAxios"; // Import pour récupérer le panier

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0); // Compteur d'articles dans le panier

  const myUser = JSON.parse(localStorage.getItem("myUser"));

  useEffect(() => {
    if (myUser) {
      myAxios.get(`/api/carts?id_user=${myUser.id}`).then((response) => {
        console.info(response.data);
        setCartItemCount(response.data.length);
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

  return (
    <div className="header">
      <Link to='/'>
        <h1>La Boutique de Matheroff</h1>
      </Link>
      <nav>
        <div className="navbar">
          <div className="menu-searchbar">
            <div className="img-title-text">      
              <Link to="/">
                <img src={Menu} alt="Catégories" />
              </Link>
              <span className="hover-text">Catégories</span>
            </div>
            <input
              className="search-input"
              type="text"
              placeholder="Que recherchez-vous ?"
              onKeyUp={handleKeyDown}
            />
          </div>
          <div className="user-icons">
            <div className="img-title-text">
              <Link to={myUser ? '/userprofile' : '/'}>
                <img
                  src={Userlocked}
                  alt="Se connecter"
                  aria-hidden="true"
                  onClick={handleModalOpen} />
              </Link>
              <span className="hover-text">Mon compte</span>
            </div>
            <div className="img-title-text">      
              <Link to="/favorites">
                <img src={Heart} alt="Favoris" />
              </Link>
              <span className="hover-text">Favoris</span>
            </div>
            <div className="img-title-text cart-icon">
              <Link to="/cart">
                <img src={Cart} alt="Panier" />
                {cartItemCount > 0 && <span className="cart-notification"></span>}
              </Link>
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