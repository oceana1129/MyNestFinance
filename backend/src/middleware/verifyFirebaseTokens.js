import admin from "../config/firebase.js";

export async function verifyFirebaseToken(req, res, next) {

  // Testing
  if (process.env.NODE_ENV === "test") {
    return next();
  }

  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decodedToken =
      await admin.auth().verifyIdToken(token);

    req.user = decodedToken;

    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}
