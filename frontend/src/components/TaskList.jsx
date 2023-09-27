import React, { useState } from "react";
import AddTask from "./AddTask";

const TaskList = ({ tasks, setTasks, markAsComplete, removeTask }) => {
    const sortedTasks = [...tasks].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const [move, setMove] = useState({});

    const handleRemove = (id) => {
        setMove({ [id]: "moveRight" });
        setTimeout(() => {
            removeTask(id);
            setMove({});
        }, 1000);
    };

    const handleComplete = (id) => {
        setMove({ [id]: "moveLeft" });
        setTimeout(() => {
            markAsComplete(id);
            setMove({});
        }, 1000);
    };

    return (
        <div className="taskListContainer">
            <div className="titleTaskList">
                <h1>Tâches en cours</h1>
            </div>
            <div className="addTaskList">
                <AddTask onAdd={(newTask) => setTasks([...tasks, newTask])} />
            </div>
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

export default TaskList;
