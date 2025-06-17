import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postsRoutes from "./routes/postsRoutes.js";
import { connectDB } from "./config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());

app.use("/api/posts", postsRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serwer działa na http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Błąd połączenia z MongoDB:", error);
    process.exit(1);
  });
