import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ThemeList({ themes }) {

  return (
    <ul>
      {themes.map((theme) => (
        <Link to={`/themes/${theme.id}`} key={theme.id}>
        <li>{theme.name}</li>
        </Link>
      ))}
    </ul>
  );
}

ThemeList.propTypes = {
  themes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ThemeList;