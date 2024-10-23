import { useLoaderData, Link } from "react-router-dom";
import "./Shop.css";
import "./Lists.css";
import CategoriesIntro from "../components/CategoriesIntro";
import Footer from "../components/Footer";
import davidg from "../assets/images/davidgood.png";

function Shop() {

    const items = useLoaderData();

    return (
        <div className="column">
            <CategoriesIntro />
            <section className="fil-ariane">
                <Link to="/">
                    <p>Accueil ≻</p>
                </Link>
                <Link to="/shop">
                    <p>Nos articles ≻</p>
                </Link>
            </section>
            <section className="grid-articles">
                {items[0] && items[0].length > 0 ? (
                    items[0].map((item) => (
                        <Link to={(`/item/${item.id}`)} key={item.id}>
                            <div className="article-card"> 
                                <img src={item.image} alt="Article" />
                                <p>{item.name}</p>
                                <button type="button">Voir +</button>
                            </div>
                        </Link>
                    ))
                    ) : (
                        <div className="no-item">
                            <h3>Aucun article disponible</h3>
                            <img src={davidg} alt="Désolé, aucun article disponible"/>
                        </div>
                    )
                }
            </section>
            <Footer />
        </div>
    )
}

export default Shop;