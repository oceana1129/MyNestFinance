import request from "supertest"

import app from "../src/testApp.js"

import AuthUser from "../src/models/AuthUser.js"
import User from "../src/models/UserProfile.js"
import MonthlyBudget from "../src/models/MonthlyBudget.js"
import BudgetCategory from "../src/models/BudgetCategory.js"
import BudgetItem from "../src/models/BudgetItem.js"
import BudgetActivityLog from "../src/models/BudgetActivityLog.js"
import BudgetPlan from "../src/models/BudgetPlan.js"


/**
 * Create users, budgets, and debt plans
 */
async function createTestBudgetPlan(count = 2) {
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
    })

    const category = await BudgetCategory.create({
        monthlyBudget: budget._id,
        displayOrder: 0,
        name: `Category`,
        emoji: "heart",
        color: "FFFFFF",
        categoryType: "expense",
    })
    
    const item1 = await BudgetItem.create({
        budgetCategory: category._id,
        displayOrder: 0,
        name: "Item 1",
        emoji: "emoji",
        itemType: category.categoryType,
    })

    const item2 = await BudgetItem.create({
        budgetCategory: category._id,
        displayOrder: 1,
        name: "Item 2",
        emoji: "heart",
        itemType: category.categoryType,
    })

    let plan = await BudgetPlan.create({
        budgetItem: item1._id,
        scheduleType: "monthly",
        dayOfMonth: 28
    });

    return {item1, item2, plan}
}

describe("Budget Plan API", () => {
    test("get all plans", async () => {
        await createTestBudgetPlan();
        const response = await request(app).get("/api/plan");

        expect(response.status).toBe(200);
        expect(response.body.budgetPlans).toHaveLength(1)
    })

    test("get plan by id", async () => {
        const {plan} = await createTestBudgetPlan();
        const response = await request(app)
            .get(`/api/plan/${plan._id}`);

        expect(response.status).toBe(200);
        expect(response.body.budgetPlan._id).toBe(
            plan._id.toString()
        );
    })

    test("returns 404 when plan doesn't exist", async () => {
        const response = await request(app).get(
        "/api/plan/507f191e810c19729de860ea",
        );

        expect(response.status).toBe(404);
    })

    test("get plan by item", async () => {
        const {item1} = await createTestBudgetPlan();
        const response = await request(app)
            .get(`/api/plan/item/${item1._id}`);

        expect(response.status).toBe(200);
        expect(response.body.budgetPlan.budgetItem).toBe(item1._id.toString());
    })

    test("update a plan", async () => {
        const {plan} = await createTestBudgetPlan();

        const response = await request(app)
            .put(`/api/plan/${plan._id}`)
            .send({dayOfMonth: 18});

        expect(response.status).toBe(200);
        expect(response.body.updatedBudgetPlan.dayOfMonth).toBe(18);
    })

    test("delete a plan", async () => {
        const {plan} = await createTestBudgetPlan();
        const response = await request(app)
            .delete(`/api/plan/${plan._id}`)
        expect(response.status).toBe(200);
        const deletedPlan = await BudgetPlan
            .findById(plan._id)
        expect(deletedPlan).toBeNull();
    })

    test("delete a plan by item", async () => {
        const {item1} = await createTestBudgetPlan();
        const response = await request(app)
            .delete(`/api/plan/item/${item1._id}`);
        expect(response.status).toBe(200);
        const deletedPlan = await BudgetPlan.find({
            budgetItem: item1._id,
        })
        expect(deletedPlan).toHaveLength(0);
    })
})