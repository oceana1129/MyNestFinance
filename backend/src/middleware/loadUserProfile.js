import AuthUser from "../models/AuthUser.js"
import UserProfile from "../models/UserProfile.js";

export async function loadUserProfile(req, res, next) {

  try {

    // testing
    if (process.env.NODE_ENV === "test") {

      // if a specific test identity was set
      if (req.user?.uid) {
        const authUser = await AuthUser.findOne({
          _firebaseUid: req.user.uid,
        });

        if (!authUser) {
          return res.status(404).json({
            message: "Auth user not found",
          });
        }

        const profile = await UserProfile.findOne({
          authUser: authUser._id,
        });

        if (!profile) {
          return res.status(404).json({
            message: "User profile not found",
          });
        }

        req.authUser = authUser;
        req.profile = profile;

        return next();
      }

      // no specific identity requested
      const profile = await UserProfile.findOne().populate("authUser");

      if (!profile) {
        return res.status(404).json({
          message: "User profile not found",
        });
      }

      req.profile = profile;
      req.authUser = profile.authUser;

      return next();
    }

    // production
    const authUser = await AuthUser.findOne({
      _firebaseUid: req.user.uid,
    });

    if (!authUser) {
      return res.status(404).json({
        message: "Auth user not found",
      });
    }

    const profile = await UserProfile.findOne({
      authUser: authUser._id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "User profile not found",
      });
    }

    req.authUser = authUser;
    req.profile = profile;

    next();

  } catch (err) {
    next(err);
  }
}