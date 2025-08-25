import { useState } from "react";
import axios from "axios";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", { title });
      onTaskAdded(res.data); // send new task to parent
      setTitle("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
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
