import User from "../models/UserProfile.js";

/**
 * Returns all user profiles.
 *
 * SECURITY: gates until admin role is added
 */
export async function getAllUsers(_, res) {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All users found:\n", users });
  } catch (err) {
    console.error("Error in getAllUsers controller", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * Returns the current authenticated user's own profile.
 * req.profile was already loaded by loadUserProfile middleware,
 * derived from the verified Firebase token.
 */
export async function getCurrentUser(req, res) {
  res.status(200).json({ message: "Current user found", user: req.profile });
}

/**
 * Updates the current authenticated user's display name.
 */
export async function updateUserName(req, res) {
  try {
    const { displayName } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.profile._id,
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
 * Updates the current authenticated user's onboarding information.
 *
 * Can update the following:
 *  - onboardingComplete
 *  - onboardingStep
 *  - budgetStylePreference
 */
export async function updateUserOnboarding(req, res) {
  try {
    const { onboardingAnswers, onboardingComplete, onboardingStep, budgetStylePreference } =
      req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.profile._id,
      {
        "onboarding.onboardingAnswers": onboardingAnswers,
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
 * Updates the current authenticated user's settings.
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
      req.profile._id,
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