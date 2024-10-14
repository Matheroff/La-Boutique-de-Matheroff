import { Link, useLoaderData } from "react-router-dom";


function ThemeDetails() {
  const theme = useLoaderData();

  return (
    <>
      <h1>{theme.name}</h1>
      <Link to={`/themes/${theme.id}/edit`}>Modifier</Link>
    </>
  );
}

export default ThemeDetails;