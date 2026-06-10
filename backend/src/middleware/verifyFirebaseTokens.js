import admin from "../config/firebase.js";

export async function verifyFirebaseToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      console.error("verifyFirebaseToken(): no token provided");
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = decodedToken;

    next();
  } catch (err) {
    console.error("verifyFirebaseToken(): invalid token provided", err);
    res.status(401).json({
      message: "Invalid token",
    });
  }
}
