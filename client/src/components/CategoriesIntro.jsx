import "./CategoriesIntro.css";
import Mugs from "../assets/images/intro/mug-intro.png";
import TShirts from "../assets/images/intro/t-shirt-intro.png";
import Casquettes from "../assets/images/intro/casquette-intro.png";
import Magnets from "../assets/images/intro/magnet-intro.png";
import PorteCles from "../assets/images/intro/portecle-intro.png";
import Stickers from "../assets/images/intro/stickers-intro.png";


function CategoriesIntro() {

    return (
        <div className="categories-intro">
            <div>
                <img src={Mugs} alt="Mugs"/>
                <p>Mugs</p>
            </div>
            <div>
                <img src={TShirts} alt="T-Shirts"/>
                <p>T-Shirts</p>
            </div>
            <div>
                <img src={Casquettes} alt="Casquettes"/>
                <p>Casquettes</p>
            </div>
            <div>
                <img src={Magnets} alt="Magnets"/>
                <p>Magnets</p>
            </div>
            <div>
                <img src={PorteCles} alt="Porte-clés"/>
                <p>Porte-clés</p>
            </div>
            <div>
                <img src={Stickers} alt="Stickers"/>
                <p>Stickers</p>
            </div>
        </div>
    )
}

export default CategoriesIntro;