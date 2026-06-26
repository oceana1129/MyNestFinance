import request from "supertest"

import app from "../src/testApp.js"

import AuthUser from "../src/models/AuthUser.js"
import User from "../src/models/UserProfile.js"
import MonthlyBudget from "../src/models/MonthlyBudget.js"
import BudgetCategory from "../src/models/BudgetCategory.js"
import BudgetItem from "../src/models/BudgetItem.js"
import BudgetActivityLog from "../src/models/BudgetActivityLog.js"
import BudgetDebtItem from "../src/models/BudgetDebtItem.js"


/**
 * Create users, budgets, and debt items
 */
async function createTestDebtItem(count = 2) {
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
        monthlyBudget: budget._id,
        displayOrder: 0,
        name: "Item 1",
        emoji: "emoji",
    })

    const item2 = await BudgetItem.create({
        budgetCategory: category._id,
        monthlyBudget: budget._id,
        displayOrder: 1,
        name: "Item 2",
        emoji: "heart",
    })

    let debt = await BudgetDebtItem.create({
        budgetItem: item1._id,
        debtType: "credit-card",
        currentBalance: 2347,
    });

    return {item1, item2, debt}
}

describe("Debt Item API", () => {
    test("get all debts", async () => {
        await createTestDebtItem();
        const response = await request(app).get("/api/debt");

        expect(response.status).toBe(200);
        expect(response.body.debtItems).toHaveLength(1)
    })

    test("get debt by id", async () => {
        const {debt} = await createTestDebtItem();
        const response = await request(app)
            .get(`/api/debt/${debt._id}`);

        expect(response.status).toBe(200);
        expect(response.body.debtItem._id).toBe(
            debt._id.toString()
        );
    })

    test("returns 404 when debt doesn't exist", async () => {
        const response = await request(app).get(
        "/api/debt/507f191e810c19729de860ea",
        );

        expect(response.status).toBe(404);
    })

    test("get debt by item", async () => {
        const {item1} = await createTestDebtItem();
        const response = await request(app)
            .get(`/api/debt/item/${item1._id}`);

        expect(response.status).toBe(200);
        expect(response.body.debtItem.budgetItem).toBe(item1._id.toString());
    })

    test("update a debt", async () => {
        const {debt} = await createTestDebtItem();

        const response = await request(app)
            .put(`/api/debt/${debt._id}`)
            .send({currentBalance: 100});

        expect(response.status).toBe(200);
        expect(response.body.updatedDebtItem.currentBalance).toBe(100);
    })

    test("delete a debt", async () => {
        const {debt} = await createTestDebtItem();
        const response = await request(app)
            .delete(`/api/debt/${debt._id}`)
        expect(response.status).toBe(200);
        const deletedDebt = await BudgetDebtItem
            .findById(debt._id)
        expect(deletedDebt).toBeNull();
    })

    test("delete all debts by item", async () => {
        const {item1} = await createTestDebtItem();
        const response = await request(app)
            .delete(`/api/debt/item/${item1._id}`);
        expect(response.status).toBe(200);
        const deletedDebt = await BudgetActivityLog.find({
            budgetItem: item1._id,
        })
        expect(deletedDebt).toHaveLength(0);
    })
})