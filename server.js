import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";   // ✅ Import CORS
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors()); // ✅ Enable CORS for all origins (development)

// If you want to restrict only to React frontend, use this instead:
// app.use(cors({ origin: "http://localhost:3000" }));

// ✅ Routes
app.use("/api/tasks", taskRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("✅ Server is running successfully!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
