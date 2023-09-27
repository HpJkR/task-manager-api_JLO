import { Link } from 'react-router-dom';
import LogoJLO from "../assets/groupJlo.png"

function Navbar () {
    return (
        <nav className='navbarContainer'>
            <img src={LogoJLO} alt="Logo du groupe JLO" />
            <ul>
                <li>
                    <Link to="/in-progress">Tâches en cours</Link>
                </li>
                <li>
                    <Link to="/completed">Tâches terminées</Link>
                </li>
                <li>
                    <Link to="/">Réglages</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
