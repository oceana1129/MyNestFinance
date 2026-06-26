import request from "supertest";

import app from "../src/testApp.js";

import AuthUser from "../src/models/AuthUser.js";
import User from "../src/models/UserProfile.js";
import MonthlyBudget from "../src/models/MonthlyBudget.js";
import BudgetCategory from "../src/models/BudgetCategory.js";
import BudgetItem from "../src/models/BudgetItem.js";
import BudgetActivityLog from "../src/models/BudgetActivityLog.js";
import BudgetDebtItem from "../src/models/BudgetDebtItem.js";
import BudgetPlan from "../src/models/BudgetPlan.js";

/**
 * Create users, budgets, and items for categories
 */
async function createTestItem(count = 3) {
  const authUser = await AuthUser.create({
    _firebaseUid: crypto.randomUUID(),
    emailAddress: `${crypto.randomUUID()}@test.com`,
    provider: "password",
  });

  const user = await User.create({
    authUser: authUser._id,
    displayName: "Test User 1",
  });

  const budget = await MonthlyBudget.create({
    userProfile: user._id,
    month: 1,
    year: 2025,
  });

  const category1 = await BudgetCategory.create({
    monthlyBudget: budget._id,
    displayOrder: 0,
    name: `Category 1`,
    emoji: "heart",
    color: "FFFFFF",
    categoryType: "income",
  });

  const category2 = await BudgetCategory.create({
    monthlyBudget: budget._id,
    displayOrder: 1,
    name: `Category 2`,
    emoji: "money-with-wings",
    color: "FFFFFF",
    categoryType: "expense",
  });

  let items = [];

  for (let i = 0; i < count; i++) {
    let item = await BudgetItem.create({
      budgetCategory: category1._id,
      monthlyBudget: budget._id,
      displayOrder: i,
      name: `Item ${i}`,
      emoji: "emoji",
    });
    items.push(item);
  }

  for (let i = 0; i < count; i++) {
    let item = await BudgetItem.create({
      budgetCategory: category2._id,
      monthlyBudget: budget._id,
      displayOrder: i,
      name: `Item ${i}`,
      emoji: "emoji",
    });
    items.push(item);
  }

  let activities = [];

  for (let i = 0; i < count; i++) {
    let activity = await BudgetActivityLog.create({
      budgetItem: items[0]._id,
      name: `Log ${i}`,
      amount: 50,
    });
    activities.push(activity);
  }

  for (let i = 0; i < count; i++) {
    let activity = await BudgetActivityLog.create({
      budgetItem: items[0]._id,
      name: `Log ${i}`,
      amount: 50,
    });
    activities.push(activity);
  }

  let debt = await BudgetDebtItem.create({
    budgetItem: items[0]._id,
    debtType: "credit-card",
    currentBalance: 2347,
  });

  let plan = await BudgetPlan.create({
    budgetItem: items[0]._id,
    scheduleType: "monthly",
    dayOfMonth: 28,
  });

  return { category1, category2, items, activities, debt, plan };
}

describe("Budget Item API", () => {
  test("get all items", async () => {
    let count = 4;
    await createTestItem(count);

    const response = await request(app).get("/api/item");
    expect(response.status).toBe(200);
    expect(response.body.items).toHaveLength(count * 2);
  });

  test("get item by id", async () => {
    const { items } = await createTestItem();
    const response = await request(app).get(`/api/item/${items[0]._id}`);
    expect(response.status).toBe(200);
    expect(response.body.item._id).toBe(items[0]._id.toString());
  });

  test("returns 404 when item does not exist", async () => {
    const response = await request(app).get(
      "/api/item/507f191e810c19729de860ea",
    );

    expect(response.status).toBe(404);
  });

  test("get all items by a category", async () => {
    let count = 3;
    const { category1 } = await createTestItem(count);
    const response = await request(app).get(
      `/api/item/category/${category1._id}`,
    );
    expect(response.status).toBe(200);
    expect(response.body.items).toHaveLength(count);
  });

  test("update an item", async () => {
    const { items } = await createTestItem();

    const response = await request(app)
      .put(`/api/item/${items[0]._id}`)
      .send({ name: "New Name" });
    expect(response.status).toBe(200);
    expect(response.body.updatedItem.name).toBe("New Name");
  });

  test("reorder items", async () => {
    const { items } = await createTestItem();

    const reorderedItems = [
      {
        id: items[0]._id,
        displayOrder: 2,
      },
      {
        id: items[1]._id,
        displayOrder: 1,
      },
    ];

    const response = await request(app).patch("/api/item/reorder").send({
      items: reorderedItems,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Items reordered successfully");

    const updatedItem1 = await BudgetItem.findById(items[0]._id);
    const updatedItem2 = await BudgetItem.findById(items[1]._id);

    expect(updatedItem1.displayOrder).toBe(2);
    expect(updatedItem2.displayOrder).toBe(1);
  });

  test("returns 400 when items is not an array", async () => {
    const response = await request(app).patch("/api/item/reorder").send({
      categories: {},
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Items array required");
  });

  test("returns 400 when no items are provided", async () => {
    const response = await request(app).patch("/api/item/reorder").send({
      categories: [],
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Items array required");
  });

  test("delete an item", async () => {
    const { items } = await createTestItem();
    const response = await request(app).delete(`/api/item/${items[0]._id}`);
    expect(response.status).toBe(200);
    const deletedItem = await BudgetItem.findById(items[0]._id);
    expect(deletedItem).toBeNull();
  });

  test("delete an item and cascade", async () => {
    const { items, activities, debt, plan } = await createTestItem();
    const response = await request(app).delete(`/api/item/${items[0]._id}`);
    expect(response.status).toBe(200);
    const deletedItem = await BudgetItem.findById(items[0]._id);
    const deletedActivity = await BudgetActivityLog.findById(activities[0]._id);
    const deletedDebt = await BudgetDebtItem.findById(debt._id);
    const deletedPlan = await BudgetPlan.findById(plan._id);
    expect(deletedItem).toBeNull();
    expect(deletedActivity).toBeNull();
    expect(deletedDebt).toBeNull();
    expect(deletedPlan).toBeNull();
  });
});
