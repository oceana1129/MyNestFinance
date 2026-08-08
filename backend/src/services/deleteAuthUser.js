import admin from "../config/firebase.js";
import AuthUser from "../models/AuthUser.js";
import UserProfile from "../models/UserProfile.js";

import { deleteUserData } from "./deleteUserData.js";

/**
 * Delete an AuthUser and all related data.
 *
 * @param {String} authId AuthUser id
 * @returns {Object|null} deleted AuthUser
 */
export async function deleteAuthUserData(authId) {
  // find auth user
  const authUser = await AuthUser.findById(authId);

  // auth user doesn't exist
  if (!authUser) {
    return null;
  }

  // find linked profile
  const user = await UserProfile.findOne({
    authUser: authId,
  });

  // delete profile and all child data
  if (user) {
    await deleteUserData(user._id);
  }

  // delete auth user
  await AuthUser.findByIdAndDelete(authUser._id);

  // delete the Firebase account last
  try {
    await admin.auth().deleteUser(authUser._firebaseUid);
  } catch (err) {
    // the firebase user is gone
    // could be deleted manually or cleaned up
    if (err.code !== "auth/user-not-found") {
      throw err;
    }
  }
  // return deleted user
  return authUser;
}
