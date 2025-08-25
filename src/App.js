import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add task
  const addTask = () => {
    if (!newTask) return;
    axios.post("http://localhost:5000/api/tasks", { title: newTask })
      .then(res => {
        setTasks([...tasks, res.data]);
        setNewTask("");
      })
      .catch(err => console.error(err));
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(err => console.error(err));
  };

  // Update task
  const toggleComplete = (task) => {
    axios.put(`http://localhost:5000/api/tasks/${task._id}`, { completed: !task.completed })
      .then(res => {
        setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ margin: "50px" }}>
      <h1>✅ Task Manager</h1>

      <div>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span
              onClick={() => toggleComplete(task)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
