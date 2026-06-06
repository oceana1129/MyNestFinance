import mongoose from "mongoose";

/**
 * Stores authentication information for a user.
 *
 * Linked to Firebase Authentication and contains account level
 * information only.
 *
 * For user preferences and onboarding look at UserProfile.js
 */
const authUserSchema = new mongoose.Schema(
  {
    /**
     * Unique Firebase Authentication UID.
     */
    _firebaseUid: {
      type: String,
      unique: true,
      required: true,
    },

    /**
     * User email address provided by Firebase.
     */
    emailAddress: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },

    /**
     * Whether the user's email has been verified.
     */
    emailVerified: {
      type: Boolean,
      default: false,
    },

    /**
     * Authentication provider used to create the account.
     * Possible values: email, google, facebook apple,
     * yahoo, and microsoft.
     */
    provider: {
      type: String,
      enum: ["email", "google", "facebook", "apple", "yahoo", "microsoft"],
      required: true,
    },

    /**
     * Timestamp of the user's most recent successful login.
     */
    lastSignIn: {
      type: Date,
      default: Date.now,
    },
  },

  /**
   * Automatically adds: createdAt and updatedAt
   */
  { timestamps: true },
);

authUserSchema.index({ _firebaseUid: 1 }, { unique: true });

/**
 * AuthUser model.
 */
const AuthUser = mongoose.model("AuthUser", authUserSchema);

export default AuthUser;
