import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import "./Suggestions.css";

function Suggestions() {

    const items = useLoaderData();
    const [randomItems, setRandomItems] = useState([]);

    useEffect(() => {
        if (items[0].length > 0) {
            const shuffledItems = items[0].sort(() => 0.5 - Math.random());
            setRandomItems(shuffledItems.slice(0, 4));
        }
    }, [items]);

    return (
        <div className="suggestions">
            <h2>Nos suggestions</h2>
            <div className="img-suggestions">
                {randomItems.map((item) => (
                    <Link to={`/item/${item.id}`} key={item.id}>
                        <img 
                            src={item.image} 
                            alt={`Suggestion ${item.id + 1}`} 
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Suggestions;