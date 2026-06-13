import dotenv from "dotenv";

import app from "./testApp.js";

import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
});
