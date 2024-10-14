import { useLoaderData, useNavigate } from "react-router-dom";
import "./Home.css";
import "./Lists.css";
import CategoriesIntro from "../components/CategoriesIntro";
import Footer from "../components/Footer";

function Shop() {

    const items = useLoaderData()
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          navigate();
        }
      };


    return (
        <div className="column">
            <CategoriesIntro />
            <section className="fil-ariane">
                <p
                    type="button"
                    onClick={() => navigate("/")}
                    aria-hidden="true"
                    onKeyUp={handleKeyDown}
                >
                    Accueil ≻
                </p>
                <p
                    type="button"
                    onClick={() => navigate("/shop")}
                    aria-hidden="true"
                    onKeyUp={handleKeyDown}
                >
                    Nos articles ≻
                </p>
            </section>
            <section className="grid-articles">
            {items.map((item) => (
                <div
                    key={item.id}> 
                    <img src={item.image} alt="Article"/>
                    <p>{item.name}</p>
                    <button
                        type="button"
                        onClick={() => navigate(`/item/${item.id}`)}
                        onKeyUp={handleKeyDown}
                    >
                        Voir +
                    </button>
                </div>
            ))}
            </section>
            <Footer />
        </div>
    )
}

export default Shop;