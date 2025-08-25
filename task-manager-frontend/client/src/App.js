import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  // Add new task
  const addTask = async () => {
    if (!newTask) return;
    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask })
    });
    const data = await res.json();
    setTasks([...tasks, data]);
    setNewTask("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Task Manager</h2>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
