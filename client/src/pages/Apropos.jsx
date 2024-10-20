import { Link } from "react-router-dom";
import { useState } from "react";
import "./Apropos.css";
import Footer from "../components/Footer";

function Apropos() {

    const [formData, setFormData] = useState({
        theme: "",
        });
       
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.info("Form Data Submitted:", formData);
      };

    return (
        <div>
            <section className="fil-ariane">
                <Link to="/">
                    <p type="button">Accueil ≻
                    </p>
                </Link>
                <p>A propos</p>
            </section>
            <section className="apropos-page">
            <h3 className="apropos-boutique">A propos de la boutique</h3>
                <div className="border-bottom">
                    
                    <p>
                        La Boutique de Matheroff est une boutique spécialisée dans la 
                        vente d’articles  de pop-culture. Créée en 2024, elle a pour but 
                        que toute personne à la recherche  d’objets décoratifs à l’effigie
                        de leurs personnages, marques ou lieux préférés  trouve son 
                        compte. Faites donc un tour dans notre boutique. Et si vous ne 
                        trouvez  pas le thème que vous recherchez, n’hésitez pas à nous 
                        contacter pour nous en  suggérer de nouveaux. Nous sommes
                        ouverts à toute suggestion. Bonne visite !
                    </p>
                </div>
                <h3>Contactez-nous</h3>
                <div className="border-bottom">
                    <p>matheroffshop@hotmail.fr<br/>
                    Siège social - 11 Rue Hippolyte Kahn - 69100 Villeurbanne</p>
                    <div className="theme-idea" onSubmit={handleSubmit}>
                        <p>Une idée de thème ?</p>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            placeholder="Suggérez-la nous ..."
                        />
                        <button type="submit">Envoyer</button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Apropos;