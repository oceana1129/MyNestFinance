import request from "supertest";
import crypto from "crypto";

import app from "../src/testApp.js";

import AuthUser from "../src/models/AuthUser.js";
import User from "../src/models/UserProfile.js";
import MonthlyBudget from "../src/models/MonthlyBudget.js";

/**
 * creates an AuthUser and UserProfile pair with a known uid
 */
async function createTestAuthUser(uid = crypto.randomUUID()) {
  const authUser = await AuthUser.create({
    _firebaseUid: uid,
    emailAddress: `${uid}@test.com`,
    provider: "password",
  });

  const user = await User.create({
    authUser: authUser._id,
    displayName: "Test User",
  });

  return { uid, authUser, user };
}

describe("Auth User API", () => {
  test("sync creates a new AuthUser and UserProfile for a brand new uid", async () => {
    const uid = crypto.randomUUID();

    const response = await request(app)
      .post("/api/auth/sync")
      .set("x-test-uid", uid)
      .set("x-test-email", `${uid}@test.com`);

    expect(response.status).toBe(200);
    expect(response.body.authUser._firebaseUid).toBe(uid);
    expect(response.body.profile).not.toBeNull();

    const created = await AuthUser.findOne({ _firebaseUid: uid });
    expect(created).not.toBeNull();
  });

  test("sync on an existing uid does not create a duplicate", async () => {
    const { uid } = await createTestAuthUser();

    const response = await request(app)
      .post("/api/auth/sync")
      .set("x-test-uid", uid);

    expect(response.status).toBe(200);

    const matches = await AuthUser.find({ _firebaseUid: uid });
    expect(matches).toHaveLength(1);
  });

  test("gets the current auth user for the given uid", async () => {
    const { uid, authUser } = await createTestAuthUser();

    const response = await request(app)
      .get("/api/auth/me")
      .set("x-test-uid", uid);

    expect(response.status).toBe(200);
    expect(response.body.authUser._id).toBe(authUser._id.toString());
  });

  test("returns 404 for a uid with no matching AuthUser", async () => {
    const response = await request(app)
      .get("/api/auth/me")
      .set("x-test-uid", crypto.randomUUID());

    expect(response.status).toBe(404);
  });

  test("deletes the current user and cascades to their budgets", async () => {
    const { uid, authUser, user } = await createTestAuthUser();

    const budget = await MonthlyBudget.create({
      userProfile: user._id,
      month: 1,
      year: 2025,
    });

    const response = await request(app)
      .delete("/api/auth/me")
      .set("x-test-uid", uid);

    expect(response.status).toBe(200);

    expect(await AuthUser.findById(authUser._id)).toBeNull();
    expect(await User.findById(user._id)).toBeNull();
    expect(await MonthlyBudget.findById(budget._id)).toBeNull();
  });

  // deletion cannot effect another persons data
  test("deleting one user does not affect a different user", async () => {
    const userA = await createTestAuthUser();
    const userB = await createTestAuthUser();

    const response = await request(app)
      .delete("/api/auth/me")
      .set("x-test-uid", userA.uid);

    expect(response.status).toBe(200);

    // user A is gone
    expect(await AuthUser.findById(userA.authUser._id)).toBeNull();
    expect(await User.findById(userA.user._id)).toBeNull();

    // user B is completely untouched
    expect(await AuthUser.findById(userB.authUser._id)).not.toBeNull();
    expect(await User.findById(userB.user._id)).not.toBeNull();
  });
});