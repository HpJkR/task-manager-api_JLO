import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./ThemeContext";

import TaskList from "./components/TaskList";
import CompletedTasks from "./components/CompletedTasks";
import Navbar from "./components/NavBar";
import Settings from "./components/Setting";

function App() {
    // État local pour stocker les tâches
    const [tasks, setTasks] = useState([]);
    // Charger les tâches à partir de l'API au montage du composant
    useEffect(() => {
        axios
            .post("http://localhost:8000/graphql", {
                query: `{
        tasks {
          id
          description
          status
          created_at
        }
      }`,
            })
            .then((response) => {
                if (response.data.errors) {
                    console.error("Erreurs GraphQL:", response.data.errors);
                    return;
                }
                console.log(response.data.data.tasks);
                if (response.data.data && response.data.data.tasks) {
                    setTasks(response.data.data.tasks);
                }
            })
            .catch((error) => {
                console.error("Erreur :", error);
            });
    }, []);
    // Mettre à jour une tâche spécifique
    const updateTask = (updatedTask) => {
        const existingTask = tasks.find((task) => task.id === updatedTask.id);
        const mergedTask = { ...existingTask, ...updatedTask };
        console.log("Mise à jour de la tâche avec merge:", mergedTask);
        setTasks(
            tasks.map((task) =>
                task.id === updatedTask.id ? mergedTask : task
            )
        );
    };
    // Supprimer une tâche spécifique
    const deleteTask = (id) => {
        console.log("Appel à deleteTask avec ID:", id);
        setTasks((prevTasks) => {
            const newTasks = prevTasks.filter((task) => task.id !== id);
            console.log("Nouvelle liste de tâches:", newTasks);
            return newTasks;
        });
    };
    // Supprimer toutes les tâches complétées
    const deleteCompletedTasks = () => {
        axios
            .post("http://localhost:8000/graphql", {
                query: `mutation {
        deleteCompletedTasks
      }`,
            })
            .then((response) => {
                console.log(response);
                setTasks(tasks.filter((task) => task.status !== "completed"));
                toast.success(
                    "Toutes les tâches complétées ont été supprimées avec succès",
                    {
                        position: toast.POSITION.TOP_RIGHT,
                    }
                );
            })
            .catch((error) => {
                console.error("Une erreur s'est produite:", error);
                toast.error(
                    "Une erreur s'est produite lors de la suppression des tâches complétées",
                    {
                        position: toast.POSITION.TOP_RIGHT,
                    }
                );
            });
    };
    // Marquer une tâche comme complétée
    const markAsComplete = (id) => {
        console.log("Marquage comme complété, ID:", id);
        updateTaskStatus(id, "completed");
    };
    // Marquer une tâche comme en cours
    const markAsInProgress = (id) => {
        console.log("Marquage comme en cours, ID:", id);
        updateTaskStatus(id, "in_progress");
    };
    // Mettre à jour le statut d'une tâche
    const updateTaskStatus = (id, newStatus) => {
        axios
            .post("http://localhost:8000/graphql", {
                query: `mutation {
        updateTask(id: ${id}, status: "${newStatus}") {
          id
          description
          status
        }
      }`,
            })
            .then((response) => {
                console.log("Réponse de la mutation:", response.data.data);
                if (response.data.data && response.data.data.updateTask) {
                    const updatedTask = { id, status: newStatus };
                    updateTask(updatedTask);
                    toast.success("Tâche modifiée avec succès", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch((error) => {
                console.error("Une erreur s'est produite:", error);
                toast.error(
                    "Une erreur s'est produite lors de la modification de la tâche",
                    {
                        position: toast.POSITION.TOP_RIGHT,
                    }
                );
            });
    };
    // Supprimer une tâche
    const removeTask = (id) => {
        console.log("Tentative de suppression, ID:", id);
        axios
            .post("http://localhost:8000/graphql", {
                query: `mutation {
        deleteTask(id: ${id})
      }`,
            })
            .then((response) => {
                console.log("Réponse de la suppression:", response.data);
                if (response.data.data && response.data.data.deleteTask) {
                    console.log("Suppression réussie, ID:", id);
                    deleteTask(id);
                    toast.success("Tâche supprimée avec succès", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    console.log("Suppression échouée");
                }
            })
            .catch((error) => {
                console.error("Une erreur s'est produite:", error);
                toast.error(
                    "Une erreur s'est produite lors de la suppression de la tâche",
                    {
                        position: toast.POSITION.TOP_RIGHT,
                    }
                );
            });
    };

    return (
        <div className="App">
            <ThemeProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route
                            path="/in-progress"
                            element={
                                <TaskList
                                    tasks={tasks}
                                    setTasks={setTasks}
                                    markAsComplete={markAsComplete}
                                    removeTask={removeTask}
                                />
                            }
                        />
                        <Route
                            path="/completed"
                            element={
                                <CompletedTasks
                                    tasks={tasks}
                                    setTasks={setTasks}
                                    markAsInProgress={markAsInProgress}
                                    removeTask={removeTask}
                                    deleteCompletedTasks={deleteCompletedTasks}
                                />
                            }
                        />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </Router>
                <ToastContainer />
            </ThemeProvider>
        </div>
    );
}

export default App;
