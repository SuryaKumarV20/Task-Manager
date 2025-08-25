import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// ✅ CREATE Task
router.post("/", async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    // Basic validation
    if (!title || title.trim() === "") {
      return res.status(400).json({ success: false, message: "Task title is required" });
    }

    const newTask = new Task({ title, description, completed });
    const savedTask = await newTask.save();

    res.status(201).json({ success: true, data: savedTask });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ READ all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ UPDATE Task
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // ensures validation runs during update
    });

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, data: updatedTask });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ DELETE Task
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
