import { Form } from "react-router-dom";
import "../pages/Lists.css";

function ThemeForm() {
  
    return (
      <div className="flex-row">
        <Form method="post">
            <input 
                type="text" 
                id="name" 
                name="name"
                placeholder="Nouveau thème"
            />
            <button type="submit">Ajouter</button>
        </Form>
      </div>
    );
  }
  
  export default ThemeForm;