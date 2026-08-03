import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import budgetRoutes from "./routes/monthlyBudgetRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import budgetItemRoutes from "./routes/budgetItemRoutes.js";
import activityLogRoutes from "./routes/activityLogRoutes.js";
import debtItemRoutes from "./routes/budgetDebtItemRoutes.js";
import budgetPlanRoutes from "./routes/budgetPlanRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js"

// set up .env config
dotenv.config();
// get port from env
const PORT = process.env.PORT || 5001;
// set up express
const app = express();
// use use middleware cors on front end url
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

console.log("cors added")
// can read json sent from client
app.use(express.json());
// set up rate limiter
// rate limiter needs to be set up again
// app.use(rateLimiter);

// set up routes
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/item", budgetItemRoutes);
app.use("/api/activity", activityLogRoutes);
app.use("/api/debt", debtItemRoutes);
app.use("/api/plan", budgetPlanRoutes);
app.use("/api/dashboard", dashboardRoutes);

// connect to the database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});