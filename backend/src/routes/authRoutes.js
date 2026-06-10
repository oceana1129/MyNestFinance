import express from "express";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseTokens.js";
import {
  getAllAuthUsers,
  syncAuthUser,
  getCurrentAuthUser,
  deleteAuthUser,
  cleanupAuthUsers,
} from "../controllers/authUserController.js";

const router = express.Router();

// these are the controller routes
router.get("/", getAllAuthUsers);
router.post("/sync", verifyFirebaseToken, syncAuthUser);
router.get("/me", verifyFirebaseToken, getCurrentAuthUser);
router.delete("/cleanup", cleanupAuthUsers);

export default router;
