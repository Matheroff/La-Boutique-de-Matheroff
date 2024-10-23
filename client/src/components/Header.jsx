import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";
import Cart from "../assets/images/cart.png";
import User from "../assets/images/user.png";
import Heart from "../assets/images/heart.png";
import Menu from "../assets/images/menu-burger.png";
import AuthModal from "./AuthModal";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const myUser = JSON.parse(localStorage.getItem('myUser'));

  useEffect(() => {
      if (searchTerm) { // Assure que searchTerm n'est pas vide
        navigate(`/shop/search/${searchTerm}`);
      }
  }, [searchTerm, navigate]); // S'exécute chaque fois que searchTerm change

  const handleKeyDown = (event) => {
    // console.info(event.target.value)
    if (event.key === 'Enter') {
      setSearchTerm(event.target.value); // Met à jour dès touche entrée
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
                <img
                  src={Menu}
                  alt="Catégories"
                />
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
                  src={User}
                  alt="Se connecter"
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
       <AuthModal 
         isOpen={isModalOpen}
         onClose={handleModalClose} 
       /> 
    </div>
  );
}

export default Header;



// import { useEffect, useState } from "react";
// import "./Header.css";
// import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
// import Cart from "../assets/images/cart.png";
// import User from "../assets/images/user.png";
// import Heart from "../assets/images/heart.png";
// import Menu from "../assets/images/menu-burger.png";
// import AuthModal from "./AuthModal";

// function Header() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate
//   const location = useLocation();
//   const [searchTerm, setSearchTherm] = useState("");

//   // Déclenche la navigation chaque fois que searchTerm est mis à jour
//   useEffect(() => {
//     // Je vérifie que je suis bien sur le path "/shop" pour faire la rehcerche d'articles
//     if (location.pathname.startsWith("/shop")) {
//       if (searchTerm) { // Assure que searchTerm n'est pas vide
//         // navigate(`/shop/search/${searchTerm}`);
//       } else { // Si vide, on affiche tous les articles
//         navigate("/shop");
//       }
//     }
//   }, [searchTerm, navigate]); // S'effectue à chaque fois que searchTerm change

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       setSearchTherm(event.target.value); // Met à jour dès touche entrée
//     }
//   }

//   const handleModalOpen = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="header">
//       <Link to="/">
//         <h1 type="button">La Boutique de Matheroff</h1>
//       </Link>
//       <nav>
//         <div className="navbar">
//           <div className="menu-searchbar">
//             <div className="img-title-text">
//               <Link to="/">
//                 <img 
//                   type="button"
//                   src={Menu} 
//                   alt="Catégories"
//                 />
//               </Link>
//               <span className="hover-text">Catégories</span>
//             </div>
//             <input
//               className="search-input"
//               type="text"
//               placeholder="Que recherchez-vous ?"
//               onKeyUp={handleKeyDown}
//             />
//           </div>
//           <div className="user-icons">
//             <div className="img-title-text">
//               <Link to="/userprofile">
//                 <img
//                   src={User}
//                   alt="Se connecter"
//                   aria-hidden="true"
//                   onClick={handleModalOpen}
//                 />
//               </Link>
//               <span className="hover-text">Mon compte</span>
//             </div>
//             <div className="img-title-text">
//               <Link to="/favorites">
//                 <img 
//                   src={Heart} 
//                   alt="Favoris" 
//                 />
//               </Link>
//               <span className="hover-text">Favoris</span>
//             </div>
//             <div className="img-title-text">
//               <Link to="/cart">
//                 <img 
//                   src={Cart} 
//                   alt="Panier"
//                 />
//               </Link>
//               <span className="hover-text">Panier</span>
//             </div>
//           </div>
//         </div>
//         <Outlet />
//       </nav>
//       <AuthModal 
//         isOpen={isModalOpen} 
//         onClose={handleModalClose} 
//       />
//     </div>
//   );
// }

// export default Header;