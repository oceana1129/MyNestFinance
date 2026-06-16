import request from "supertest";

import app from "../src/testApp.js";

import AuthUser from "../src/models/AuthUser.js";
import User from "../src/models/UserProfile.js";

/**
 * create authuser and user profile for testing
 */
async function createTestUser() {
  const authUser = await AuthUser.create({
    _firebaseUid: crypto.randomUUID(),
    emailAddress: `${Date.now()}@test.com`,
    provider: "password",
  });

  const user = await User.create({
    authUser: authUser._id,
    displayName: "Test User",
  });

  return user;
}

describe("User API", () => {
  test("gets all users", async () => {
    await createTestUser();

    const response = await request(app).get("/api/user");

    expect(response.status).toBe(200);
    expect(response.body.users.length).toBe(1);
  });

  test("gets user by id", async () => {
    const user = await createTestUser();

    const response = await request(app).get(`/api/user/${user._id}`);

    expect(response.status).toBe(200);
    expect(response.body.user._id).toBe(user._id.toString());
  });

  test("returns 404 when user does not exist", async () => {
    const response = await request(app).get(
      "/api/user/507f191e810c19729de860ea",
    );

    expect(response.status).toBe(404);
  });

  test("updates user display name", async () => {
    const user = await createTestUser();

    const response = await request(app).put(`/api/user/${user._id}/name`).send({
      displayName: "Olivia",
    });

    expect(response.status).toBe(200);

    expect(response.body.updatedUser.displayName).toBe("Olivia");
  });

  test("updates onboarding settings", async () => {
    const user = await createTestUser();

    const response = await request(app)
      .put(`/api/user/${user._id}/onboarding`)
      .send({
        onboardingComplete: true,
        onboardingStep: 5,
        budgetStylePreference: "simple",
      });

    expect(response.status).toBe(200);

    expect(response.body.updatedUser.onboarding.onboardingComplete).toBe(true);
  });

  test("updates user settings", async () => {
    const user = await createTestUser();

    const response = await request(app)
      .put(`/api/user/${user._id}/settings`)
      .send({
        currencyPreference: "USD",
        showDecimals: true,
        emailNotifications: true,
        appNotifications: true,
        colorMode: "dark",
      });

    expect(response.status).toBe(200);

    expect(response.body.updatedUser.settings.currencyPreference).toBe("USD");
  });

  test("deletes user", async () => {
    const user = await createTestUser();

    const response = await request(app).delete(`/api/user/${user._id}`);

    expect(response.status).toBe(200);

    const deletedUser = await User.findById(user._id);

    expect(deletedUser).toBeNull();
  });
});
