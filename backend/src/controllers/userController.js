import User from "../models/UserProfile.js";
import { deleteUserData } from "../services/deleteUserData.js";

/**
 * Will return all user objects
 *
 * Notes:
 *  - .find() returns all objects
 *  - .sort({createdAt: -1}) will sort by newly created
 *  - .sort({createdAt: 1}) will sort by oldest created
 * @param {*} req
 * @param {*} res
 */
export async function getAllUsers(_, res) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All users found:\n", users });
  } catch (err) {
    console.error("Error in getAllUsers controller", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * Will return a specific user object
 */
export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res
      .status(200)
      .json({ message: `User with id ${req.params.id} found`, user });
  } catch (err) {
    console.error("Error in getUserById controller", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * Will update a specific user object
 */
export async function updateUserName(req, res) {
  try {
    const { displayName } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { displayName },
      { new: true, runValidators: true },
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ message: "User updated successfully!", updatedUser });
  } catch (err) {
    console.error("Error in updateUser controller", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * Updates a user's onboarding information
 *
 * Can update the following:
 *  - onboardingComplete
 *  - onboardingStep
 *  - budgetStylePreference
 */
export async function updateUserOnboarding(req, res) {
  try {
    const { onboardingComplete, onboardingStep, budgetStylePreference } =
      req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        "onboarding.onboardingComplete": onboardingComplete,
        "onboarding.onboardingStep": onboardingStep,
        "onboarding.budgetStylePreference": budgetStylePreference,
      },
      { new: true, runValidators: true },
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      message: "User onboarding status updated successfully!",
      updatedUser,
    });
  } catch (err) {
    console.error("Error in updateUserOnboarding controller", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * Updates a user's setting
 *
 * Can update the following:
 *  - currencyPreference
 *  - showDecimals
 *  - emailNotifications
 *  - appNotifications
 *  - colorMode
 */
export async function updateUserSettings(req, res) {
  try {
    const {
      currencyPreference,
      showDecimals,
      emailNotifications,
      appNotifications,
      colorMode,
    } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        "settings.currencyPreference": currencyPreference,
        "settings.showDecimals": showDecimals,
        "settings.emailNotifications": emailNotifications,
        "settings.appNotifications": appNotifications,
        "settings.colorMode": colorMode,
      },
      { new: true, runValidators: true },
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      message: "User settings updated successfully!",
      updatedUser,
    });
  } catch (err) {
    console.error("Error in updateUserSettings controller", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * Will delete a specific user object
 */
export async function deleteUser(req, res) {
  try {
    const deletedUser = await deleteUserData(
      req.params.id
    );

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully!",
      deletedUser,
    });
  } catch (err) {
    console.error("deleteUser()", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}
