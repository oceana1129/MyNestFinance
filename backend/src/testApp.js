import express from "express";

import testRoutes from "./routes/testRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// import budgetRoutes from "./routes/monthlyBudgetRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import budgetItemRoutes from "./routes/budgetItemRoutes.js";
// import activityLogRoutes from "./routes/activityLogRoutes.js";
// import debtItemRoutes from "./routes/budgetDebtItemRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/test", testRoutes);
// app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// app.use("/api/budget", budgetRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/item", budgetItemRoutes);
// app.use("/api/activity", activityLogRoutes);
// app.use("api/debt", debtItemRoutes);

export default app;
