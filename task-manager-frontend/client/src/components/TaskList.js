import axios from "axios";

function TaskList({ tasks, setTasks }) {
  // Toggle complete
  const toggleTask = async (id, completed) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map(task => task._id === id ? res.data : task));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id} className={task.completed ? "completed" : ""}>
          <span onClick={() => toggleTask(task._id, task.completed)}>
            {task.title}
          </span>
          <button onClick={() => deleteTask(task._id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
