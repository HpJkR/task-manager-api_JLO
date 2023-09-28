import { useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";

function CompletedTasks({
    tasks,
    deleteCompletedTasks,
    markAsInProgress,
    removeTask,
}) {
    // Filtrer les tâches terminées
    const completedTasks = tasks.filter((task) => task.status === "completed");
    // Utiliser le contexte du thème
    const { theme } = useContext(ThemeContext);
    // Utiliser useState pour gérer l'animation des tâches
    const [move, setMove] = useState({});

    // Définir les couleurs de fond en fonction du thème
    const backgroundColor = {
        Violet: "#6732BA",
        Rose: "#E83B88",
        Bleu: "#4BBDCC",
        Vert: "#BCCF00",
        Orange: "#F9B65C",
    };

    // Fonction pour supprimer une tâche
    const handleRemove = (id) => {
        setMove({ [id]: "moveRight" });
        setTimeout(() => {
            removeTask(id);
            setMove({});
        }, 800);
    };

    // Fonction pour marquer une tâche comme en cours
    const handleComplete = (id) => {
        setMove({ [id]: "moveLeft" });
        setTimeout(() => {
            markAsInProgress(id);
            setMove({});
        }, 800);
    };

    // Rendu du composant
    return (
        <div className="completedTasksContainer">
            <div className="titleCompletedTasks">
                <h1 style={{ color: backgroundColor[theme] }}>
                    Tâches terminées
                </h1>
                <div
                    style={{ backgroundColor: backgroundColor[theme] }}
                    className="lineUnderTitle"
                ></div>
            </div>

            {/* Vérifier si des tâches terminées existent */}
            {completedTasks.length > 0 ? (
                <div>
                    <ul className="completedTasksContent">
                        {completedTasks.map((task) => (
                            <li key={task.id}>
                                <div
                                    className={`completedCard moving ${
                                        move[task.id] || ""
                                    }`}
                                >
                                    <button
                                        id="buttonTerminated"
                                        onClick={() => handleComplete(task.id)}
                                    >
                                        Repasser <br />
                                        en cours
                                    </button>
                                    <div id="descriptionTaskCompleted">
                                        <p>{task.description}</p>
                                        <span id="dateTask">
                                            {new Date(
                                                task.created_at
                                            ).toLocaleDateString("fr-FR")}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleRemove(task.id)}
                                        id="buttonDelete"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="deleteAllbuttons">
                        <button onClick={deleteCompletedTasks}>
                            Supprimer toutes les tâches terminées
                        </button>
                    </div>
                </div>
            ) : (
                <div className="noTasksCompleted">
                    <p>Il n'y a aucune tâche terminée.</p>
                </div>
            )}
        </div>
    );
}

export default CompletedTasks;
