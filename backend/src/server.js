import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// set up .env config
dotenv.config();
// get port from env
const PORT = process.env.PORT || 5001;
// set up express
const app = express();
// can read json sent from client
app.use(express.json());
// set up rate limiter
app.use(rateLimiter);
// use use middleware cors on front end url
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// set up routes
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// connect to the database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});
