import "./Header.css";
import { Outlet, useNavigate } from "react-router-dom";
import Cart from "../assets/images/cart.png";
import User from "../assets/images/user.png";
import Heart from "../assets/images/heart.png";
import Menu from "../assets/images/menu-burger.png";

function Header() {
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate();
    }
  };

  return (
    <div className="header">
      <h1
        type="button"
        onClick={() => navigate("/")}
        aria-hidden="true"
        onKeyUp={handleKeyDown}
      >
        La Boutique de Matheroff
      </h1>
      <nav>
        <div className="navbar">
          <div className="menu-searchbar">
            <div className="img-title-text">
              <img
                src={Menu}
                alt="Catégories"
                type="button"
                onClick={() => navigate("/")}
                aria-hidden="true"
                onKeyUp={handleKeyDown}
              />
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
              <img
                src={User}
                alt="Se connecter"
                type="button"
                onClick={() => navigate("/userprofile")}
                aria-hidden="true"
                onKeyUp={handleKeyDown}
              />
              <span className="hover-text">Mon compte</span>
            </div>
            <div className="img-title-text">
              <img
                src={Heart}
                alt="Favoris"
                type="button"
                onClick={() => navigate("/favorites")}
                aria-hidden="true"
                onKeyUp={handleKeyDown}
              />
              <span className="hover-text">Favoris</span>
            </div>
            <div className="img-title-text">
              <img
                src={Cart}
                alt="Panier"
                onClick={() => navigate("/cart")}
                aria-hidden="true"
                onKeyUp={handleKeyDown}
              />
              <span className="hover-text">Panier</span>
            </div>
          </div>
        </div>
        <Outlet />
      </nav>
    </div>
  );
}

export default Header;


