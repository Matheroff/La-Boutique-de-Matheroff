import { useLoaderData, Link } from "react-router-dom";
import "./OurThemes.css";
import Videogames from "../assets/images/supermario.jpg";
import Mangas from "../assets/images/naruto.jpg";
import Cinema from "../assets/images/starwars.jpg";


function OurThemes() {

    const themes = useLoaderData();

    const imagesMapping = {
        "Jeux vidéos" : Videogames,
        "Manga - Dessin animé" : Mangas,
        "Cinéma - Série" : Cinema
    };

    return (
        <div className="bg-theme">
            <h2>Nos thèmes</h2>
            {themes[2].slice(0, 3).map((theme) => (
                <Link to={`/shop/theme/${theme.id}`} key={theme.id}>
                    <img
                        src={imagesMapping[theme.name]} 
                        alt={theme.name} 
                    />
                </Link>
            ))}
        </div>
    )
}

export default OurThemes;