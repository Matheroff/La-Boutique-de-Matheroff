import { Form, useLoaderData } from "react-router-dom";

function ThemeEdit() {
  
  const loaderData = useLoaderData();

  return (
    <div>
      <Form method="put">
        <label htmlFor="name">Nom</label>{" "}
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={loaderData.name}
        />
        <button type="submit">Modifier</button>
      </Form>
      <Form method="delete">
        <button type="submit">Supprimer</button>
      </Form>
    </div>
  );
}

export default ThemeEdit;