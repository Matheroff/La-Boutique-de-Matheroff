import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./AuthModal.css";

function AuthModal({ isOpen, onClose }) {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode); // Bascule entre connexion et inscription
  };

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
              <button type="button" onClick={toggleMode}>Inscrivez-vous ici</button>
            </p>
          </div>
        ) : (
          <div>
            <Register />
              <button type="button" onClick={toggleMode}>Connectez-vous ici</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
