import express from "express";
import {
  getAllTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest,
} from "../controllers/testController.js";

const router = express.Router();

// these are the controller routes
// user would send a put request to update the note with id #21 for example
router.get("/", getAllTests);
router.get("/:id", getTestById);
router.post("/", createTest);
router.put("/:id", updateTest);
router.delete("/:id", deleteTest);

export default router;
