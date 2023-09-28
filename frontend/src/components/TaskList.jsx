import { useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";

import AddTask from "./AddTask";

const TaskList = ({ tasks, setTasks, markAsComplete, removeTask }) => {
    // Trier les tâches en fonction de la date de création
    const sortedTasks = [...tasks].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    // Utilisation de l'état local pour gérer les animations de déplacement
    const [move, setMove] = useState({});

    // Utilisation du contexte pour récupérer le thème actif
    const { theme } = useContext(ThemeContext);

    // Couleurs des différents thèmes
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

    // Fonction pour marquer une tâche comme terminée
    const handleComplete = (id) => {
        setMove({ [id]: "moveLeft" });
        setTimeout(() => {
            markAsComplete(id);
            setMove({});
        }, 800);
    };

    // Rendu du composant
    return (
        <div className="taskListContainer">
            <div className="titleTaskList">
                <h1 style={{ color: backgroundColor[theme] }}>
                    Tâches en cours
                </h1>
                <div
                    style={{ backgroundColor: backgroundColor[theme] }}
                    className="lineUnderTitle"
                ></div>
            </div>

            {/* Intégration du composant AddTask */}
            <div className="addTaskList">
                <AddTask onAdd={(newTask) => setTasks([...tasks, newTask])} />
            </div>

            {/* Affichage des tâches en cours */}
            <ul className="inProgressContainer">
                {sortedTasks.map(
                    (task) =>
                        task.status === "in_progress" && (
                            <li key={task.id}>
                                <div
                                    className={`inProgressContent moving ${
                                        move[task.id] || ""
                                    }`}
                                >
                                    <button
                                        id="buttonTerminated"
                                        onClick={() => handleComplete(task.id)}
                                    >
                                        Terminée
                                    </button>
                                    <div id="descriptionTask">
                                        <p>{task.description}</p>
                                        <span id="dateTask">
                                            {new Date(
                                                task.created_at
                                            ).toLocaleDateString("fr-FR")}
                                        </span>
                                    </div>
                                    <button
                                        id="buttonDelete"
                                        onClick={() => handleRemove(task.id)}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
};

// Export du composant
export default TaskList;
