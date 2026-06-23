import request from "supertest";

import app from "../src/testApp.js";

import AuthUser from "../src/models/AuthUser.js";
import User from "../src/models/UserProfile.js";
import MonthlyBudget from "../src/models/MonthlyBudget.js";
import BudgetCategory from "../src/models/BudgetCategory.js";
import BudgetItem from "../src/models/BudgetItem.js";
import BudgetActivityLog from "../src/models/BudgetActivityLog.js";
import {
  calculateActualAmount,
  calculatePlannedAmount,
} from "../src/services/budgetCategoryService.js";

/**
 * Create users, budgets, and categories for user
 */
async function createTestCategory(count = 3) {
  const authUser = await AuthUser.create({
    _firebaseUid: crypto.randomUUID(),
    emailAddress: `${crypto.randomUUID()}@test.com`,
    provider: "password",
  });

  const user = await User.create({
    authUser: authUser._id,
    displayName: "Test User 1",
  });

  const budget1 = await MonthlyBudget.create({
    userProfile: user._id,
    month: 1,
    year: 2025,
  });

  const budget2 = await MonthlyBudget.create({
    userProfile: user._id,
    month: 2,
    year: 2025,
  });

  let categories = [];

  for (let i = 0; i < count; i++) {
    let category = await BudgetCategory.create({
      monthlyBudget: budget1._id,
      displayOrder: i,
      name: `Category ${i}`,
      emoji: "heart",
      color: "FFFFFF",
      categoryType: "income",
    });
    categories.push(category);
  }

  for (let i = 0; i < count; i++) {
    let category = await BudgetCategory.create({
      monthlyBudget: budget2._id,
      displayOrder: i,
      name: `Category ${i}`,
      emoji: "heart",
      color: "FFFFFF",
      categoryType: "income",
    });
    categories.push(category);
  }

  let items = [];

  for (let i = 0; i < count; i++) {
    let item = await BudgetItem.create({
      budgetCategory: categories[0]._id,
      displayOrder: i,
      name: `Item ${i}`,
      emoji: "emoji",
      plannedAmount: 100,
    });
    items.push(item);
  }

  for (let i = 0; i < count; i++) {
    await BudgetActivityLog.create({
      budgetItem: items[0]._id,
      name: `Log ${i}`,
      amount: 50,
    });
  }

  return { budget1, budget2, categories, items };
}

describe("Category API", () => {
  test("gets all categories", async () => {
    let count = 4;
    await createTestCategory(count);

    const response = await request(app).get("/api/category");
    expect(response.status).toBe(200);
    expect(response.body.categories).toHaveLength(count * 2);
  });

  test("gets a category by id", async () => {
    const { categories } = await createTestCategory();
    const response = await request(app).get(
      `/api/category/${categories[0]._id}`,
    );
    expect(response.status).toBe(200);
    expect(response.body.category._id).toBe(categories[0]._id.toString());
  });

  test("returns 404 when category does not exist", async () => {
    const response = await request(app).get(
      "/api/category/507f191e810c19729de860ea",
    );

    expect(response.status).toBe(404);
  });

  test("gets all categories by budget", async () => {
    let count = 3;
    const { budget1 } = await createTestCategory(count);
    const response = await request(app).get(
      `/api/category/budget/${budget1._id}`,
    );
    expect(response.status).toBe(200);
    expect(response.body.categories).toHaveLength(count);
  });

  test("update a category", async () => {
    const { categories } = await createTestCategory();

    const response = await request(app)
      .put(`/api/category/${categories[0]._id}`)
      .send({
        name: "New Name",
      });
    expect(response.status).toBe(200);
    expect(response.body.updatedCategory.name).toBe("New Name");
  });

  test("reorder categories", async () => {
    const { categories } = await createTestCategory();

    const reorderedCategories = [
      {
        id: categories[0]._id,
        displayOrder: 2,
      },
      {
        id: categories[1]._id,
        displayOrder: 1,
      },
    ];

    const response = await request(app).patch("/api/category/reorder").send({
      categories: reorderedCategories,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Categories reordered successfully!");

    const updatedCategory1 = await BudgetCategory.findById(categories[0]._id);
    const updatedCategory2 = await BudgetCategory.findById(categories[1]._id);

    expect(updatedCategory1.displayOrder).toBe(2);
    expect(updatedCategory2.displayOrder).toBe(1);
  });

  test("returns 400 when categories is not an array", async () => {
    const response = await request(app).patch("/api/category/reorder").send({
      categories: {},
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Category array required");
  });

  test("returns 400 when no categories are provided", async () => {
    const response = await request(app).patch("/api/category/reorder").send({
      categories: [],
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("No categories provided");
  });

  test("calculate actual amount", async () => {
    const { categories } = await createTestCategory();
    const total = await calculateActualAmount(categories[0]._id);
    expect(total).toBe(150);
  });

  test("calculate actual amount 2", async () => {
    const { categories } = await createTestCategory(6);
    const total = await calculateActualAmount(categories[0]._id);
    expect(total).toBe(300);
  });

  test("calculate planned amount", async () => {
    const { categories } = await createTestCategory();
    const total = await calculatePlannedAmount(categories[0]._id);
    expect(total).toBe(300);
  });

  test("calculate planned amount 2", async () => {
    const { categories } = await createTestCategory(6);
    const total = await calculatePlannedAmount(categories[0]._id);
    expect(total).toBe(600);
  });

  test("delete a category", async () => {
    const { categories } = await createTestCategory();
    const response = await request(app).delete(
      `/api/category/${categories[0]._id}`,
    );
    expect(response.status).toBe(200);
    const deletedCategory = await BudgetCategory.findById(categories[0]._id);
    expect(deletedCategory).toBeNull();
  });

  test("delete a category and cascade", async () => {
    const { categories, items } = await createTestCategory();

    const response = await request(app).delete(
      `/api/category/${categories[0]._id}`,
    );
    expect(response.status).toBe(200);
    const deletedCategory = await BudgetCategory.findById(categories[0]._id);
    const deletedItem = await BudgetItem.findById(items[0]._id);
    expect(deletedCategory).toBeNull();
    expect(deletedItem).toBeNull();
  });
});
