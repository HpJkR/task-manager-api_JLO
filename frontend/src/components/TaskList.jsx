import PropTypes from 'prop-types';
import axios from 'axios';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  const markAsComplete = (id) => {
    console.log("Marquage comme complété, ID:", id); 
    updateTaskStatus(id, "completed");
  };
  
  const markAsInProgress = (id) => {
    console.log("Marquage comme en cours, ID:", id);
    updateTaskStatus(id, "in_progress");
  };
  
  const updateTaskStatus = (id, newStatus) => {
    axios.post('http://localhost:8000/graphql', {
      query: `mutation {
        updateTask(id: ${id}, status: "${newStatus}") {
          id
          description
          status
        }
      }`
    })
    .then(response => {
      console.log("Réponse de la mutation:", response.data.data);
      if (response.data.data && response.data.data.updateTask) {
        const updatedTask = { id, status: newStatus };
        onUpdate(updatedTask);
      }
    })
    .catch(error => {
      console.error('Une erreur s\'est produite:', error);
    });
  };
  

  const removeTask = (id) => {
    console.log("Tentative de suppression, ID:", id);
    axios.post('http://localhost:8000/graphql', {
      query: `mutation {
        deleteTask(id: ${id})
      }`
    })
    .then(response => {
      console.log("Réponse de la suppression:", response.data);
      if (response.data.data && response.data.data.deleteTask) {
        console.log("Suppression réussie, ID:", id);
        onDelete(id);
      } else {
        console.log("Suppression échouée");
      }
    })
    .catch(error => {
      console.error('Une erreur s\'est produite:', error);
    });
  };
  
  

  return (
    <div>
      <ul>
      {tasks.map(task => (
  <li key={task.id}>
    {task.description}
    <button onClick={() => markAsComplete(task.id)}>Marquer comme terminée</button>
    <button onClick={() => markAsInProgress(task.id)}>Marquer comme en cours</button>
    <button onClick={() => removeTask(task.id)}>Supprimer</button>
  </li>
))}

      </ul>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskList;
