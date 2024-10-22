import { Link } from "react-router-dom";
import "./Footer.css";
import LogoM from "../assets/images/logo-M.jpg";

function Footer() {

    return (
        <div className="footer">
            <div className="links">
                <Link to="/">
                <img 
                    src={LogoM} 
                    alt="Logo boutique"
                    type="button"
                />
                </Link>
                <div className="apropos">
                <Link to="/apropos/#contact">
                    <p className="button-footer"
                        type="button"
                    >
                        Contact
                    </p>
                </Link>
                <Link to="/apropos">
                    <p className="button-footer"
                        type="button"
                    >
                        A propos
                    </p>
                </Link>
                </div>
            </div>
            <p className="corporate">© 2024 - La Boutique de Matheroff</p>
        </div>
    );
}

export default Footer;
