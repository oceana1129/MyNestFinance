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

  test("gets current user", async () => {
    const user = await createTestUser();

    const response = await request(app).get("/api/user/me");

    expect(response.status).toBe(200);
    expect(response.body.user._id).toBe(user._id.toString());
  });

  test("returns 404 when no profile exists yet", async () => {
    const response = await request(app).get("/api/user/me");

    expect(response.status).toBe(404);
  });

  test("updates user display name", async () => {
    await createTestUser();

    const response = await request(app).put("/api/user/me/name").send({
      displayName: "Olivia",
    });

    expect(response.status).toBe(200);
    expect(response.body.updatedUser.displayName).toBe("Olivia");
  });

  test("updates onboarding settings", async () => {
    await createTestUser();

    const response = await request(app)
      .put("/api/user/me/onboarding")
      .send({
        onboardingComplete: true,
        onboardingStep: 5,
        budgetStylePreference: "simple",
      });

    expect(response.status).toBe(200);
    expect(response.body.updatedUser.onboarding.onboardingComplete).toBe(true);
  });

  test("updates user settings", async () => {
    await createTestUser();

    const response = await request(app)
      .put("/api/user/me/settings")
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
});