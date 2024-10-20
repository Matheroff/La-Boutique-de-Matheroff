import { useLoaderData, Link } from "react-router-dom";
import "./CategoriesIntro.css";
import Mug from "../assets/images/intro/mug-intro.png";
import TShirt from "../assets/images/intro/t-shirt-intro.png";
import Magnet from "../assets/images/intro/magnet-intro.png";
import Casquette from "../assets/images/intro/casquette-intro.png";
import Sticker from "../assets/images/intro/stickers-intro.png";
import PorteCle from "../assets/images/intro/portecle-intro.png";


function CategoriesIntro() {

    const categories = useLoaderData();
    console.info(categories[1]);

    const imagesMapping = {
        "Mug": Mug,
        "T-Shirt": TShirt,
        "Magnet": Magnet,
        "Casquette": Casquette,
        "Sticker": Sticker,
        "Porte-clé": PorteCle
      };

    return (
        <div className="categories-intro">
            {categories[1].slice(0, 6).map((categorie) => (
                <Link to={`/shop/category/${categorie.id}`} key={categorie.id}>
                    <div>
                        <img 
                            src={imagesMapping[categorie.name]} 
                            alt={categorie.name} 
                        />
                        <p>{categorie.name}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default CategoriesIntro;