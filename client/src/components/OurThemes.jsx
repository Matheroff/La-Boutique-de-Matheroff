import "./OurThemes.css";
import Videogames from "../assets/images/supermario.jpg";
import Mangas from "../assets/images/naruto.jpg";
import Cinema from "../assets/images/starwars.jpg";

function OurThemes() {

    return (
        <div className="bg-theme">
            <h2>Nos thèmes</h2>
            <img src={Videogames} alt="Thème 1"/>
            <img src={Mangas} alt="Thème 2"/>
            <img src={Cinema} alt="Thème 3"/>
        </div>
    )
}

export default OurThemes;