import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

function Settings () {
    // Utiliser le contexte pour récupérer la fonction setTheme et la variable theme
    const { setTheme, theme } = useContext(ThemeContext);

    // Définir les noms des thèmes et leurs couleurs correspondantes
    const themes = ["Violet", "Rose", "Bleu", "Vert", "Orange"];
    const themeColors = {
        Violet: "#6732BA",
        Rose: "#E83B88",
        Bleu: "#4BBDCC",
        Vert: "#BCCF00",
        Orange: "#F9B65C",
    };

    // Rendu du composant
    return (
        <div className="settingContainer">
            <div className="titleSettings">
                {/* Affichage dynamique de la couleur du texte en fonction du thème actif */}
                <h1 style={{ color: themeColors[theme] }}>Paramètres</h1>
                <div style={{ backgroundColor: themeColors[theme] }} className="lineUnderTitle"></div>
            </div>
            <div className="titlePaletteColors">
                <h2>Choisissez un thème de couleur :</h2>
            </div>

            {/* Boucle pour afficher les options de couleur */}
            <div className="paletteColorsContainer">
                {themes.map((t) => (
                    <div
                        key={t}
                        onClick={() => setTheme(t)}
                        style={{
                            backgroundColor: themeColors[t],
                        }}
                        className="paletteColorsContent"
                    >
                        <span>{t}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Settings;
