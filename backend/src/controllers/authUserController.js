import admin from "../config/firebase.js";
import AuthUser from "../models/AuthUser.js";
import UserProfile from "../models/UserProfile.js";
import { deleteAuthUserData } from "../services/deleteAuthUser.js";

export async function getAllAuthUsers(_, res) {
  try {
    const users = await AuthUser.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All auth users found:\n", users });
  } catch (err) {
    console.error("Error in getAllAuthUsers controller", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * Will create an auth user from the firebase DB
 *
 * @param {*} req
 * @param {*} res
 */
export async function syncAuthUser(req, res) {
  try {
    console.log("syncAuthUser(): syncing user for auth");

    const { uid, email, firebase } = req.user;

    // firebase provider used for authentication.
    const provider = firebase.sign_in_provider;

    // if firebase user exists in app database
    let authUser = await AuthUser.findOne({
      _firebaseUid: uid,
    });

    // NEW USER (first login and signup)
    if (!authUser) {
      // create a new user
      authUser = await AuthUser.create({
        _firebaseUid: uid,
        emailAddress: email,
        provider,
        lastSignIn: new Date(),
      });

      // create base app user profile
      await UserProfile.create({
        authUser: authUser._id,
      });

      console.log("syncUser(): created AuthUser");
    }
    // EXISTING USER
    else {
      // update most recent sign in
      authUser.lastSignIn = new Date();
      await authUser.save();
      console.log("syncUser(): sync AuthUser signed in");
    }

    /**
     * User's profile information
     */
    const profile = await UserProfile.findOne({
      authUser: authUser._id,
    });

    res.status(200).json({
      authUser,
      profile,
    });
  } catch (err) {
    console.error("syncAuthUser(): ", err);

    res.status(500).json({
      message: err.message,
    });
  }
}

export async function getCurrentAuthUser(req, res) {
  try {
    const authUser = await AuthUser.findOne({
      _firebaseUid: req.user.uid,
    });

    if (!authUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const profile = await UserProfile.findOne({
      authUser: authUser._id,
    });

    res.status(200).json({
      authUser,
      profile,
    });
  } catch (err) {
    console.error("getCurrentAuthUser(): ", err);
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function deleteAuthUser(req, res) {
  try {
    const authUser = await AuthUser.findOne({
      _firebaseUid: req.user.uid,
    });

    if (!authUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await deleteAuthUserData(authUser._id)

    res.status(200).json({
      message: "Account deleted",
    });
  } catch (err) {
    console.error("Error in deleteAuthUser controller", err);
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function cleanupAuthUsers(_, res) {
  try {
    const authUsers = await AuthUser.find();

    let deletedCount = 0;

    // go through each user grabbed from auth users
    for (const authUser of authUsers) {
      try {
        // try to find the user in firebase auth
        await admin.auth().getUser(authUser._firebaseUid);

        // firebase user exists
        console.log(`Firebase user exists: ${authUser._firebaseUid}`);
      } catch (err) {
        // firebase user does not exist
        if (err.code === "auth/user-not-found") {
          console.log(`Deleting orphaned user: ${authUser._firebaseUid}`);

          await deleteAuthUserData(authUser._id)

          deletedCount++;
        } else {
          throw err;
        }
      }
    }

    res.status(200).json({
      message: "Cleanup complete",
      deletedCount,
    });
  } catch (err) {
    console.error("cleanupOrphanedAuthUsers():", err);

    res.status(500).json({
      message: err.message,
    });
  }
}
