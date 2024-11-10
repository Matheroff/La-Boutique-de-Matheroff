import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, requiredRole, ...rest }) => {
  const myUser = JSON.parse(localStorage.getItem("myUser"));

  if ((myUser && myUser.is_admin !== 1) || !myUser) {
    // Si l'utilisateur n'a pas le bon rôle, redirigez vers une page d'erreur ou autre page
    return <Navigate to="/not-authorized" />;
  }

  // Si l'utilisateur est authentifié et a le bon rôle, rendre l'élément (le dashboard par exemple)
  return element;
};

export default ProtectedRoute;