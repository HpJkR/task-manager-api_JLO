import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTask({ onAdd }) {
    // Utilisation de useState pour gérer la nouvelle tâche
    const [newTask, setNewTask] = useState("");

    // Fonction pour ajouter une nouvelle tâche
    const addTask = () => {
        // Vérification si newTask est vide
        if (!newTask) return;

        // Exécution de la requête GraphQL pour créer une nouvelle tâche
        axios
            .post("http://localhost:8000/graphql", {
                query: `mutation {
        createTask(description: "${newTask}", status: "in_progress") {
          id
          description
          status
          created_at 
        }
      }`,
            })
            .then((response) => {
                // Vérification et ajout de la nouvelle tâche à la liste
                if (response.data.data && response.data.data.createTask) {
                    const addedTask = response.data.data.createTask;
                    onAdd(addedTask);
                    // Réinitialisation de newTask
                    setNewTask("");
                    // Notification de succès
                    toast.success("Tâche ajoutée avec succès", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch((error) => {
                // Affichage d'une erreur en cas d'échec de la requête
                console.error("Une erreur s'est produite:", error);
                toast.error(
                    "Une erreur s'est produite lors de l'ajout de la tâche",
                    {
                        position: toast.POSITION.TOP_RIGHT,
                    }
                );
            });
    };

    // Rendu du composant
    return (
        <div className="addTaskContainer">
            <input
                type="text"
                placeholder="Nouvelle tâche"
                value={newTask}
                // Mise à jour de newTask lorsque l'utilisateur tape
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Ajouter</button>
        </div>
    );
}

export default AddTask;
