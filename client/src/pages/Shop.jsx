import { useLoaderData, Link } from "react-router-dom";
import "./Shop.css";
import "./Lists.css";
import CategoriesIntro from "../components/CategoriesIntro";
import Footer from "../components/Footer";

function Shop() {

    const items = useLoaderData();
    console.info(items);

    return (
        <div className="column">
            <CategoriesIntro />
            <section className="fil-ariane">
                <Link to="/">
                <p type="button">Accueil ≻</p>
                </Link>
                <Link to="/shop">
                <p type="button">Nos articles ≻</p>
                </Link>
            </section>
            <section className="grid-articles">
            {items[0].map((item) => (
                <Link to={(`/item/${item.id}`)} key={item.id}>
                    <div className="article-card"> 
                        <img src={item.image} alt="Article"/>
                        <p>{item.name}</p>
                        <button type="button">Voir +</button>
                    </div>
                </Link>
            ))}
            </section>
            <Footer />
        </div>
    )
}

export default Shop;