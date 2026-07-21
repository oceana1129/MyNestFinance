import express from "express";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseTokens.js";
import { loadUserProfile } from "../middleware/loadUserProfile.js";
import {
  getAllUsers,
  getCurrentUser,
  updateUserName,
  updateUserOnboarding,
  updateUserSettings,
} from "../controllers/userController.js";

const router = express.Router();

router.use(verifyFirebaseToken);
router.use(loadUserProfile);

// the controller routes
// NOTE: getAllUsers has its own internal env gate
router.get("/", getAllUsers);
router.get("/me", getCurrentUser);
router.put("/me/name", updateUserName);
router.put("/me/onboarding", updateUserOnboarding);
router.put("/me/settings", updateUserSettings);

export default router;