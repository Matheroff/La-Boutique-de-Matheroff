import { useLoaderData, useNavigate } from "react-router-dom";
import "./CategoriesIntro.css";


function CategoriesIntro() {

    const categories = useLoaderData();
    console.info(categories[1]);
    const navigate = useNavigate();

    return (
        <div className="categories-intro">
            {categories[1].map((categorie) => (
                <div
                    type="button"
                    onClick={() => navigate(`/shop/${categorie.id}`)}   
                    aria-hidden="true"
                    key={categorie.id}> 
                    <img src={categorie.image} alt="Article"/>
                    <p>
                        {categorie.name}
                    </p>
                </div>
            ))}
            {/* <div>
                <img src={Mugs} alt="Mugs"/>
                <p
                    type="button"
                    onClick={() => navigate("/shop")}
                    aria-hidden="true"
                >
                    Mugs
                </p>
            </div> */}
        </div>
    )
}

export default CategoriesIntro;