import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import bookRoutes from "./routes/book.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/books", bookRoutes);

const startServer = () => {
  try {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is connected at port: ${process.env.port}`);
    });
  } catch (error) {
    console.error("Error in server connection: ", error);
  }
};

startServer();
connectDB();
