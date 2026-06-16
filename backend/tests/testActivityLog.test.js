import request from "supertest"

import app from "../src/testApp.js"

import AuthUser from "../src/models/AuthUser.js"
import User from "../src/models/UserProfile.js"
import MonthlyBudget from "../src/models/MonthlyBudget.js"
import BudgetCategory from "../src/models/BudgetCategory.js"
import BudgetItem from "../src/models/BudgetItem.js"
import BudgetActivityLog from "../src/models/BudgetActivityLog.js"

/**
 * Create users, budgets, items, and activity logs for items
 */
async function createTestActivityLog(count = 3) {
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
        categoryType: "income",
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

    let activities = [];

    for (let i = 0; i < count; i++) {
        let activity = await BudgetActivityLog.create({
            budgetItem: item1._id,
            name: `Log ${i}`,
            amount: 50,
            activityType: item1.itemType,
        });
        activities.push(activity)
    }

    for (let i = 0; i < count; i++) {
        let activity = await BudgetActivityLog.create({
            budgetItem: item2._id,
            name: `Log ${i}`,
            amount: 50,
            activityType: item2.itemType,
        });
        activities.push(activity)
    }

    return {item1, item2, activities}
}

describe("Activity Log API", () => {
    test("get all activities", async () => {
        let count = 4;
        await createTestActivityLog(count);

        const response = await request(app).get("/api/activity");

        expect(response.status).toBe(200);
        expect(response.body.activityLogs).toHaveLength(count * 2);
    })

    test("get activity by id", async () => {
        const {activities} = await createTestActivityLog();
        const response = await request(app)
            .get(`/api/activity/${activities[0]._id}`);

        expect(response.status).toBe(200);
        expect(response.body.activityLog._id).toBe(
            activities[0]._id.toString()
        );
    })

    test("returns 404 when activity doesn't exist", async () => {
        const response = await request(app).get(
        "/api/activity/507f191e810c19729de860ea",
        );

        expect(response.status).toBe(404);
    })

    test("get all activities by item", async () => {
        let count = 3;
        const {item1} = await createTestActivityLog(count);
        const response = await request(app)
            .get(`/api/activity/item/${item1._id}`);
        expect(response.status).toBe(200);
        expect(response.body.activityLogs).toHaveLength(count);
    })

    test("update an activity", async () => {
        const {activities} = await createTestActivityLog();

        const response = await request(app)
            .put(`/api/activity/${activities[0]._id}`)
            .send({name: "New Name"});
        expect(response.status).toBe(200);
        expect(response.body.updatedActivityLog.name).toBe("New Name");
    })

    test("delete an activity", async () => {
        const {activities} = await createTestActivityLog();
        const response = await request(app)
            .delete(`/api/activity/${activities[0]._id}`)
        expect(response.status).toBe(200);
        const deletedActivity = await BudgetActivityLog
            .findById(activities[0]._id)
        expect(deletedActivity).toBeNull();
    })

    test("delete all items by category", async () => {
        const {item1} = await createTestActivityLog();
        const response = await request(app)
            .delete(`/api/activity/item/${item1._id}`);
        expect(response.status).toBe(200);
        const deletedActivities = await BudgetActivityLog.find({
            budgetItem: item1._id,
        })
        expect(deletedActivities).toHaveLength(0);
    })
})
