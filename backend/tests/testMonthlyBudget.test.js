import request from "supertest";

import app from "../src/testApp.js";

import AuthUser from "../src/models/AuthUser.js";
import User from "../src/models/UserProfile.js";
import MonthlyBudget from "../src/models/MonthlyBudget.js";
import BudgetCategory from "../src/models/BudgetCategory.js";

/**
 * Create user profile and monthly budget for testing
 */
async function createTestBudget(count = 3) {
  const authUser1 = await AuthUser.create({
    _firebaseUid: crypto.randomUUID(),
    emailAddress: `${crypto.randomUUID()}@test.com`,
    provider: "password",
  });

  const user1 = await User.create({
    authUser: authUser1._id,
    displayName: "Test User 1",
  });

  const authUser2 = await AuthUser.create({
    _firebaseUid: crypto.randomUUID(),
    emailAddress: `${crypto.randomUUID()}@test.com`,
    provider: "password",
  });

  const user2 = await User.create({
    authUser: authUser2._id,
    displayName: "Test User 2",
  });

  let budgets = [];

  for (let i = 0; i < count; i++) {
    let budget = await MonthlyBudget.create({
      userProfile: user1._id,
      month: 1 + i,
      year: 2025,
    });
    budgets.push(budget);
  }

  for (let i = 0; i < count; i++) {
    let budget = await MonthlyBudget.create({
      userProfile: user2._id,
      month: 1 + i,
      year: 2025,
    });
    budgets.push(budget);
  }

  const category = await BudgetCategory.create({
    monthlyBudget: budgets[0]._id,
    displayOrder: 0,
    name: "Category 1",
    emoji: "heart",
    color: "FFFFFF",
    categoryType: "income",
  });

  return { user1, user2, budgets, category };
}

describe("Monthly Budget API", () => {
  test("gets all budgets", async () => {
    await createTestBudget();

    const response = await request(app).get("/api/budget");

    expect(response.status).toBe(200);
    expect(response.body.budgets).toHaveLength(6);
  });

  test("gets budgets for a user", async () => {
    const { user1 } = await createTestBudget();

    const response = await request(app).get(`/api/budget/user/${user1._id}`);

    expect(response.status).toBe(200);
    expect(response.body.budgets).toHaveLength(3);
  });

  test("gets budget by id", async () => {
    const { budgets } = await createTestBudget();

    const response = await request(app).get(`/api/budget/${budgets[0]._id}`);

    expect(response.status).toBe(200);
    expect(response.body.budget._id).toBe(budgets[0]._id.toString());
  });

  test("returns 404 when budget does not exist", async () => {
    const response = await request(app).get(
      "/api/budget/507f191e810c19729de860ea",
    );

    expect(response.status).toBe(404);
  });

  test("delete budget", async () => {
    const { budgets } = await createTestBudget();

    const response = await request(app).delete(`/api/budget/${budgets[0]._id}`);

    expect(response.status).toBe(200);

    const deletedBudget = await MonthlyBudget.findById(budgets[0]._id);

    expect(deletedBudget).toBeNull();
  });
  
  test("delete budget and cascade", async () => {
    const { budgets, category } = await createTestBudget();

    const response = await request(app).delete(`/api/budget/${budgets[0]._id}`);

    expect(response.status).toBe(200);

    const deletedBudget = await MonthlyBudget.findById(budgets[0]._id);
    const deletedCategory = await BudgetCategory.findById(category._id);

    expect(deletedBudget).toBeNull();
    expect(deletedCategory).toBeNull();
  });
});
