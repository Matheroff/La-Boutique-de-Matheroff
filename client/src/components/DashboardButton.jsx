import { Link } from "react-router-dom";

function DashboardButton() {

    return (
        <div>
            <Link to="/dashboard">
                <button
                    className="button-2"
                    type="button"
                >
                    Tableau de bord
                </button>
            </Link>
        </div>
    )
}

export default DashboardButton;