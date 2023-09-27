function CompletedTasks({
    tasks,
    deleteCompletedTasks,
    markAsInProgress,
    removeTask,
}) {
    const completedTasks = tasks.filter(task => task.status === "completed");

    return (
        <>
            {completedTasks.length > 0 ? (
                <ul>
                    {completedTasks.map((task) => (
                        <li key={task.id}>
                            <p>{task.description}</p>
                            <button onClick={() => markAsInProgress(task.id)}>
                                Marquer comme en cours
                            </button>
                            <button onClick={() => removeTask(task.id)}>
                                Supprimer
                            </button>
                        </li>
                    ))}
                    <li>
                        <button onClick={deleteCompletedTasks}>
                            Supprimer toutes les tâches terminées
                        </button>
                    </li>
                </ul>
            ) : (
                <p>Il n'y a aucune tâche terminée.</p>
            )}
        </>
    );
}

export default CompletedTasks;
