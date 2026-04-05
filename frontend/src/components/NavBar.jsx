import { Link } from "react-router-dom";
import '../css/Navbar.css'

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movie App</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Movies</Link>
                <Link to="/favorites">Favorite Movies</Link>
            </div>
        </nav>
    )
}

export default NavBar