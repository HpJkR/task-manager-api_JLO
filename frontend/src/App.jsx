import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:8000/graphql', {
      query: `{
        tasks {
          id
          description
          status
        }
      }`
    })
    .then((response) => {
      if (response.data.errors) {
        console.error('Erreurs GraphQL:', response.data.errors);
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
  

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    const existingTask = tasks.find(task => task.id === updatedTask.id);
    const mergedTask = { ...existingTask, ...updatedTask };
    console.log("Mise à jour de la tâche avec merge:", mergedTask);
    setTasks(tasks.map(task => (task.id === updatedTask.id ? mergedTask : task)));
  };
  
  

  const deleteTask = (id) => {
    console.log("Appel à deleteTask avec ID:", id);
    setTasks(prevTasks => {
      const newTasks = prevTasks.filter(task => task.id !== id);
      console.log("Nouvelle liste de tâches:", newTasks);
      return newTasks;
    });
  };
  

  return (
    <div className="App">
      <h1>Gestionnaire de tâches</h1>
      <AddTask onAdd={addTask} />
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
