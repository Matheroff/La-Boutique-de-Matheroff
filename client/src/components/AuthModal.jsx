import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import "./AuthModal.css";

function AuthModal({ isOpen, onClose }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const location = useLocation();

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode); // Bascule entre connexion et inscription
  };

  useEffect(() => {
    if (location.pathname === '/userprofile') {
      onClose();  // Ferme la modale quand on est sur '/userprofile'
    }
  }, [location, onClose]);

  if (!isOpen) return null; // Ne pas afficher si la modale n'est pas ouverte

  return (
    <div className="login-modal">
      <div className="login-modal-content">
        <span 
            className="close-button" 
            aria-hidden="true"
            onClick={onClose}
        >
            &times;
        </span>
        {isLoginMode ? (
          <div>
            <h3>Connexion</h3>
            <Login />
            <p>
              Pas de compte ?{" "}
              <button className="button-2" type="button" onClick={toggleMode}>Inscrivez-vous ici</button>
            </p>
          </div>
        ) : (
          <div>
            <Register />
              <button className="button-2" type="button" onClick={toggleMode}>Connectez-vous ici</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
