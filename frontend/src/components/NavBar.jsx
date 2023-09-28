import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

import LogoJLO from "../assets/logoWhiteJlo.png";

function Navbar() {
    // Utiliser useLocation pour obtenir l'emplacement actuel dans l'application
    const location = useLocation();

    // Fonction pour vérifier si un chemin est actif
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Utiliser le contexte de thème pour accéder au thème actuel
    const { theme } = useContext(ThemeContext);

    // Définir les couleurs de fond pour chaque thème
    const backgroundColor = {
        Violet: "#6732BA",
        Rose: "#E83B88",
        Bleu: "#4BBDCC",
        Vert: "#BCCF00",
        Orange: "#F9B65C",
    };

    // Rendu du composant
    return (
        <div
            className="navbarContainer"
            style={{ backgroundColor: backgroundColor[theme] }}
        >
            <img src={LogoJLO} alt="Logo du groupe JLO" />

            {/* Lien vers les tâches en cours */}
            <Link to="/in-progress">
                <div
                    className={`navList ${
                        isActive("/in-progress") ? "active-Link" : ""
                    }`}
                    style={
                        isActive("/in-progress")
                            ? { color: backgroundColor[theme] }
                            : {}
                    }
                >
                    <span>Tâches en cours</span>
                </div>
            </Link>

            {/* Lien vers les tâches terminées */}
            <Link to="/completed">
                <div
                    className={`navList ${
                        isActive("/completed") ? "active-Link" : ""
                    }`}
                    style={
                        isActive("/completed")
                            ? { color: backgroundColor[theme] }
                            : {}
                    }
                >
                    <span>Tâches terminées</span>
                </div>
            </Link>

            {/* Lien vers les paramètres */}
            <Link to="/settings">
                <div
                    className={`navList ${
                        isActive("/settings") ? "active-Link" : ""
                    }`}
                    style={
                        isActive("/settings")
                            ? { color: backgroundColor[theme] }
                            : {}
                    }
                >
                    <span>Réglages</span>
                </div>
            </Link>
        </div>
    );
}

export default Navbar;
