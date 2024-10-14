import "./Suggestions.css";
import MugNaruto from "../assets/images/articles/mug-naruto.png";
import PorteCleKenny from "../assets/images/articles/porte-cle-kenny.png";
import TShirtSum41 from "../assets/images/articles/t-shirt-sum41.png";
import MugKaamelott from "../assets/images/articles/mug-kaamelottcestpasfaux.png";


function Suggestions() {

    return (
        <div className="suggestions">
            <h2>Nos suggestions</h2>
            <div className="img-suggestions">
                <img src={MugNaruto} alt="Suggestion 1"/>
                <img src={PorteCleKenny} alt="Suggestion 2"/>
                <img src={TShirtSum41} alt="Suggestion 3"/>
                <img src={MugKaamelott} alt="Suggestion 4"/>
            </div>
        </div>
    )
}

export default Suggestions;