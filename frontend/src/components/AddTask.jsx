import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = ({ onAdd }) => {
    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (!newTask) return;

        axios
            .post("http://localhost:8000/graphql", {
                query: `mutation {
        createTask(description: "${newTask}", status: "in_progress") {
          id
          description
          status
        }
      }`,
            })
            .then((response) => {
                if (response.data.data && response.data.data.createTask) {
                    const addedTask = response.data.data.createTask;
                    onAdd(addedTask);
                    setNewTask("");
                    toast.success("Tâches ajoutée avec succès", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch((error) => {
                console.error("Une erreur s'est produite:", error);
                toast.error(
                    "Une erreur s'est produite lors de l'ajout de la tâche",
                    {
                        position: toast.POSITION.TOP_RIGHT,
                    }
                );
            });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Nouvelle tâche"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Ajouter</button>
        </div>
    );
};

AddTask.propTypes = {
    onAdd: PropTypes.func.isRequired,
};

export default AddTask;
