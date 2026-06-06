import mongoose from "mongoose";

/**
 * Stores personal information and settings of the user.
 *
 * Is initiated upon Firebase Authentication.
 */
const userProfileSchema = new mongoose.Schema(
  {
    /**
     * Associated firebase user account.
     */
    authUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
      unique: true,
    },

    /**
     * The user's display or preferred name.
     */
    displayName: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 30,
      default: null,
    },

    /**
     * User onboarding information
     */
    onboarding: {
      /**
       * Whether the user has completed onboarding.
       */
      onboardingComplete: {
        type: Boolean,
        default: false,
      },

      /**
       * The step the user is in on their onboarding process.
       * Used for potential user drop off
       */
      onboardingStep: {
        type: Number,
        default: 0,
      },

      /**
       * Indicates the user's preferred budget style.
       * Which can include: simple, balanced, and detailed.
       */
      budgetStylePreference: {
        type: String,
        enum: ["simple", "balanced", "detailed"],
        default: null,
      },
    },

    /**
     *  The preferred settings of the user.
     * Includes information on users preferences for currency,
     * currency styling, notifications, and color theming.
     */
    settings: {
      /**
       * The users currency preference. Used to help match their budget
       * to the users preferred currency.
       */
      currencyPreference: {
        type: String,
        default: "USD",
      },

      /**
       * The users preference for decimal placement or whole numbers
       */
      showDecimals: {
        type: Boolean,
        default: true,
      },

      /**
       * Whether the user permits email notifications
       */
      emailNotifications: {
        type: Boolean,
        default: false,
      },

      /**
       * Whether the user wants to toggle in app notifications.
       */
      appNotifications: {
        type: Boolean,
        default: false,
      },

      /**
       * The preferred color mode/theming of the application.
       * Including the following:
       *  - light: light mode with light background and dark elements
       *  - dark: dark mode with dark background and light elements
       *  - system: matches the OS theme
       */
      colorMode: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "light",
      },
    },
  },
  { timestamps: true },
);

/**
 * UserProfile model.
 */
const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
