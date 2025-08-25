import React, { useState } from "react";
import axios from "axios";

function TaskForm({ setTasks }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    if (!title.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", { title });
      setTasks(prev => [...prev, res.data]); // update UI instantly
      setTitle(""); // clear input
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
