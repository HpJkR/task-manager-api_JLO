
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/in-progress">Tâches en cours</Link>
                </li>
                <li>
                    <Link to="/completed">Tâches terminée</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
