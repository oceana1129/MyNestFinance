import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUserName,
  updateUserOnboarding,
  updateUserSettings,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// the controller routes
// TODO: change from :id to dynamic auth from user
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id/name", updateUserName);
router.put("/:id/onboarding", updateUserOnboarding);
router.put("/:id/settings", updateUserSettings);
router.delete("/:id", deleteUser);

export default router;
