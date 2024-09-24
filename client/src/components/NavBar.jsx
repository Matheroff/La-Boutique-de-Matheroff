import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cart from "../assets/images/cart.png";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scrool", handleScroll);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate();
    }
  };

  return (
    <div>
      <h1>La Boutique de Matheroff</h1>
      <nav className="navbar">
        <div className={`navbar-container ${isScrolled ? "scrolled" : ""}`}>
          <div className="left-navbar">
            <p
              type="button"
              onClick={() => navigate("/")}
              aria-hidden="true"
              onKeyUp={handleKeyDown}
            >
              <span className="green-color">Catégorie</span>
            </p>
            <input
              className="search-navbar"
              type="text"
              placeholder="Type to search"
            />
          </div>
          <div className="right-navbar">
            <div className="link-navbar">
              <p
                type="button"
                onClick={() => navigate("/test")}
                aria-hidden="true"
                onKeyUp={handleKeyDown}
              >
                <span style={{ color: "blue" }}>Test</span>
              </p>
              <p
                type="button"
                onClick={() => navigate("/product")}
                aria-hidden="true"
                onKeyUp={handleKeyDown}
              >
                Découvrir la vertue de nos herbes
              </p>
              <p
                type="button"
                onClick={() => navigate("/shop")}
                aria-hidden="true"
                onKeyUp={handleKeyDown}
              >
                Boutique
              </p>
              <p>
                Sign in
              </p>
              <p
                type="button"
                onClick={() => navigate("/")}
                aria-hidden="true"
                onKeyUp={handleKeyDown}
              >
                Home
              </p>
            </div>
            <div className="end-navbar">
              <button
                type="button"
                onClick={() => navigate("/userprofile")}
                aria-hidden="true"
                onKeyUp={handleKeyDown} className="button-navbar"
              >
                Sign up
              </button>
              <img
                src={Cart}
                alt="panier"
                className="cart-navbar"
                onClick={() => navigate("/cart")}
                aria-hidden="true"
                onKeyUp={handleKeyDown}
              />
            </div>
          </div>
        </div>
        <Outlet />
      </nav>
    </div>
  );
}

export default NavBar;