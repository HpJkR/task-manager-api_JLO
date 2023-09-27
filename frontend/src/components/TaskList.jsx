// import { Link } from "react-router-dom";
import AddTask from "./AddTask";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";

const TaskList = ({ tasks, setTasks, markAsComplete, removeTask }) => {
    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    //   return (
    //     <>
    //       <ul>
    //       {tasks.map(task => (
    //         <li key={task.id}>
    //     {task.status === "in_progress" &&
    //     <>
    //     <p>{task.description}</p>
    //     <button onClick={() => markAsComplete(task.id)}>Marquer comme terminée</button>
    //     <button onClick={() => markAsInProgress(task.id)}>Marquer comme en cours</button>
    //     <button onClick={() => removeTask(task.id)}>Supprimer</button>
    //     </>
    //   }
    //   </li>
    // ))}
    // <button onClick={deleteCompletedTasks}>Supprimer toutes les tâches terminées</button>
    //       </ul>
    //     </>
    //   );

    return (
        <>
            <h1>Gestionnaire de tâches</h1>
            <AddTask onAdd={addTask} />
            <>
                {tasks.map((task) => (
                    <ul key={task.id}>
                        <li>
                            {task.status === "in_progress" && (
                                <>
                                    <p>{task.description}</p>
                                    <button
                                        onClick={() => markAsComplete(task.id)}
                                    >
                                        Marquer comme terminée
                                    </button>
                                    <button onClick={() => removeTask(task.id)}>
                                        Supprimer
                                    </button>
                                </>
                            )}
                        </li>
                    </ul>
                ))}
            </>
        </>
    );
};

export default TaskList;
