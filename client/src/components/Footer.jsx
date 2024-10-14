import { useNavigate } from "react-router-dom";
import "./Footer.css";
import LogoM from "../assets/images/logo-M.jpg";

function Footer() {
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            navigate();
        }
    };

    return (
        <div className="footer">
            <div className="links">
                <img 
                    src={LogoM} 
                    alt="Logo boutique"
                    type="button"
                    onClick={() => navigate("/")}
                    aria-hidden="true"
                    onKeyUp={handleKeyDown}
                />
                <div className="apropos">
                    <p className="button-footer"
                        type="button"
                        onClick={() => navigate("/apropos/#contact")}
                        aria-hidden="true"
                        onKeyUp={handleKeyDown}
                    >
                        Contact
                    </p>
                    <p className="button-footer"
                        type="button"
                        onClick={() => navigate("/apropos")}
                        aria-hidden="true"
                        onKeyUp={handleKeyDown}
                    >
                        A propos
                    </p>
                </div>
            </div>
            <p className="corporate">© 2024 - La Boutique de Matheroff</p>
        </div>
    );
}

export default Footer;
