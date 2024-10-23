import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import "./Suggestions.css";


function SimilarItems() {

    const items = useLoaderData();
    const [randomItems, setRandomItems] = useState([]);

    useEffect(() => {
        if (items) {
            const shuffledItems = items[1].sort(() => 0.5 - Math.random());
            setRandomItems(shuffledItems.slice(0, 4));
        }
    }, [items]);

    return (
        <div className="suggestions">
            <h2>Articles similaires</h2>
            <div className="img-suggestions">
                {randomItems.map((item) => (
                    <Link to={`/item/${item.id}`} key={item.id}>
                        <img 
                            key={item.id} 
                            src={item.image} 
                            alt={`Suggestion ${item.id + 1}`} 
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SimilarItems;

// <div className="suggestions">
// <div className="img-suggestions">
//     {randomItems.map((item) => (
//         <Link to={`/item/${item.id}`} key={item.id}>
//             <img 
//                 key={item.id} 
//                 src={item.image} 
//                 alt={`Suggestion ${item.id + 1}`} 
//             />
//         </Link>
//     ))}
// </div>
// </div>

// import MugNaruto from "../assets/images/articles/mug-naruto.png";
// import PorteCleKenny from "../assets/images/articles/porte-cle-kenny.png";
// import TShirtSum41 from "../assets/images/articles/t-shirt-sum41.png";
// import MugKaamelott from "../assets/images/articles/mug-kaamelottcestpasfaux.png";