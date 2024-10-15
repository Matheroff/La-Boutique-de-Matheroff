import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import "./Home.css";
import "./Lists.css";
import CategoriesIntro from "../components/CategoriesIntro";
import Footer from "../components/Footer";

function Shop() {

    const items = useLoaderData();
    const navigate = useNavigate();
    // const { categoryId } = useParams();
    console.info(items);

    return (
        <div className="column">
            <CategoriesIntro />
            <section className="fil-ariane">
                <p
                    type="button"
                    onClick={() => navigate("/")}
                    aria-hidden="true"
                >
                    Accueil ≻
                </p>
                <p
                    type="button"
                    onClick={() => navigate("/shop")}
                    aria-hidden="true"
                >
                    Nos articles ≻
                </p>
            </section>
            <section className="grid-articles">
            {items[0].map((item) => (
                <div
                    key={item.id}> 
                    <img src={item.image} alt="Article"/>
                    <p>{item.name}</p>
                    <button
                        type="button"
                        onClick={() => navigate(`/item/${item.id}`)}
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