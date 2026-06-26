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
async function createTestDatabase() {
    const authUser = await AuthUser.create({
        _firebaseUid: crypto.randomUUID(),
        emailAddress: `${crypto.randomUUID()}@test.com`,
        provider: "password",
    });

    const user = await User.create({
        authUser: authUser._id,
        displayName: "Test User 1",
    });

    // budget
    const budget = await MonthlyBudget.create({
        userProfile: user._id,
        month: 1,
        year: 2025,
    });

    // categories 
    const incomeCategory = await BudgetCategory.create({
        monthlyBudget: budget._id,
        displayOrder: 0,
        name: "Income",
        emoji: "money-bag",
        color: "4CAF50",
        categoryType: "income",
    });

    const homeCategory = await BudgetCategory.create({
        monthlyBudget: budget._id,
        displayOrder: 1,
        name: "Home",
        emoji: "house",
        color: "2196F3",
        categoryType: "expense",
    });

    const utilitiesCategory = await BudgetCategory.create({
        monthlyBudget: budget._id,
        displayOrder: 2,
        name: "Utilities",
        emoji: "electric-plug",
        color: "FF9800",
        categoryType: "expense",
    });

    const transportationCategory = await BudgetCategory.create({
        monthlyBudget: budget._id,
        displayOrder: 3,
        name: "Transportation",
        emoji: "car",
        color: "9C27B0",
        categoryType: "expense",
    });

    const foodCategory = await BudgetCategory.create({
        monthlyBudget: budget._id,
        displayOrder: 4,
        name: "Food",
        emoji: "fork-and-knife",
        color: "F44336",
        categoryType: "expense",
    });

    const personalCareCategory = await BudgetCategory.create({
        monthlyBudget: budget._id,
        displayOrder: 5,
        name: "Personal Care",
        emoji: "sparkles",
        color: "E91E63",
        categoryType: "expense",
    });

    const debtCategory = await BudgetCategory.create({
        monthlyBudget: budget._id,
        displayOrder: 6,
        name: "Debt",
        emoji: "credit-card",
        color: "607D8B",
        categoryType: "expense",
    });

    // income items

    const workItem = await BudgetItem.create({
        budgetCategory: incomeCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 0,
        name: "Work",
        emoji: "briefcase",
        plannedAmount: 2800,
    });

    const commissionsItem = await BudgetItem.create({
        budgetCategory: incomeCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 1,
        name: "Commissions",
        emoji: "chart-increasing",
        plannedAmount: 100,
    });

    // home items
    const rentItem = await BudgetItem.create({
        budgetCategory: homeCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 0,
        name: "Rent",
        emoji: "house",
        plannedAmount: 1200,
    });

    // electric items
    const electricItem = await BudgetItem.create({
        budgetCategory: utilitiesCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 0,
        name: "Electric",
        emoji: "lightning",
        plannedAmount: 75,
    });

    const internetItem = await BudgetItem.create({
        budgetCategory: utilitiesCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 1,
        name: "Internet",
        emoji: "globe",
        plannedAmount: 66,
    });

    const laundryItem = await BudgetItem.create({
        budgetCategory: utilitiesCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 2,
        name: "Laundry",
        emoji: "soap",
        plannedAmount: 25,
    });

    const phoneItem = await BudgetItem.create({
        budgetCategory: utilitiesCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 3,
        name: "Phone",
        emoji: "mobile-phone",
        plannedAmount: 55,
    });

    // transportation items
    const carInsuranceItem = await BudgetItem.create({
        budgetCategory: transportationCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 0,
        name: "Car Insurance",
        emoji: "automobile",
        plannedAmount: 125,
    });

    const gasItem = await BudgetItem.create({
        budgetCategory: transportationCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 1,
        name: "Gas",
        emoji: "fuel-pump",
        plannedAmount: 160,
    });

    const maintenanceItem = await BudgetItem.create({
        budgetCategory: transportationCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 2,
        name: "Maintenance",
        emoji: "wrench",
        plannedAmount: 30,
    });

    // food items
    const groceriesItem = await BudgetItem.create({
        budgetCategory: foodCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 0,
        name: "Groceries",
        emoji: "shopping-cart",
        plannedAmount: 280,
    });

    const eatingOutItem = await BudgetItem.create({
        budgetCategory: foodCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 1,
        name: "Eating Out",
        emoji: "fork-and-knife",
        plannedAmount: 100,
    });

    const coffeeItem = await BudgetItem.create({
        budgetCategory: foodCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 2,
        name: "Coffee",
        emoji: "hot-beverage",
        plannedAmount: 100,
    });

    // personal care items
    const clothingItem = await BudgetItem.create({
        budgetCategory: personalCareCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 0,
        name: "Clothing",
        emoji: "t-shirt",
        plannedAmount: 40,
    });

    const gymItem = await BudgetItem.create({
        budgetCategory: personalCareCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 1,
        name: "Gym",
        emoji: "flexed-biceps",
        plannedAmount: 80,
    });

    const birthControlItem = await BudgetItem.create({
        budgetCategory: personalCareCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 2,
        name: "Birth Control",
        emoji: "pill",
        plannedAmount: 10,
    });

    const nailsItem = await BudgetItem.create({
        budgetCategory: personalCareCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 3,
        name: "Nails",
        emoji: "nail-polish",
        plannedAmount: 20,
    });

    const adobeItem = await BudgetItem.create({
        budgetCategory: personalCareCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 4,
        name: "Adobe",
        emoji: "artist-palette",
        plannedAmount: 30,
    });

    const netflixItem = await BudgetItem.create({
        budgetCategory: personalCareCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 5,
        name: "Netflix",
        emoji: "clapper-board",
        plannedAmount: 13,
    });

    // debt items
    const studentLoanItem = await BudgetItem.create({
        budgetCategory: debtCategory._id,
        monthlyBudget: budget._id,
        displayOrder: 0,
        name: "Student Loans",
        emoji: "graduation-cap",
        plannedAmount: 150,
    });

    const studentLoanDebt = await BudgetDebtItem.create({
        budgetItem: studentLoanItem._id,
        debtType: "student-loan",
        currentBalance: 18450.00,
        interestRate: 5.05,
        minimumPayment: 150,
        originalBalance: 24000.00,
        preferredPayoffInYears: 10,
    });

    // activity logs
    const logs = await BudgetActivityLog.insertMany([
        // Income
        { budgetItem: workItem._id, monthlyBudget: budget._id, amount: 1400.22, name: "Paycheck 1", date: new Date("2025-01-03") },
        { budgetItem: workItem._id, monthlyBudget: budget._id, amount: 1560.47, name: "Paycheck 2", date: new Date("2025-01-17") },
        { budgetItem: commissionsItem._id, monthlyBudget: budget._id, amount: 95, name: "Full body", date: new Date("2025-01-10") },
        { budgetItem: commissionsItem._id, monthlyBudget: budget._id, amount: 35, name: "Emotes", date: new Date("2025-01-18") },
        { budgetItem: commissionsItem._id, monthlyBudget: budget._id, amount: 60, name: "Emotes", date: new Date("2025-01-24") },
        // Home
        { budgetItem: rentItem._id, monthlyBudget: budget._id, amount: 1220, name: "Rent", date: new Date("2025-01-01") },
        // Utilities
        { budgetItem: electricItem._id, monthlyBudget: budget._id, amount: 82, name: "Electric bill", date: new Date("2025-01-08") },
        { budgetItem: internetItem._id, monthlyBudget: budget._id, amount: 66, name: "Internet", date: new Date("2025-01-08") },
        { budgetItem: laundryItem._id, monthlyBudget: budget._id, amount: 25, name: "Laundry", date: new Date("2025-01-13") },
        { budgetItem: phoneItem._id, monthlyBudget: budget._id, amount: 55, name: "Phone bill", date: new Date("2025-01-10") },
        // Transportation
        { budgetItem: carInsuranceItem._id, monthlyBudget: budget._id, amount: 125, name: "Car insurance", date: new Date("2025-01-05") },
        { budgetItem: gasItem._id, monthlyBudget: budget._id, amount: 80, name: "Gas", date: new Date("2025-01-07") },
        { budgetItem: gasItem._id, monthlyBudget: budget._id, amount: 60, name: "Gas", date: new Date("2025-01-14") },
        { budgetItem: gasItem._id, monthlyBudget: budget._id, amount: 70, name: "Gas", date: new Date("2025-01-22") },
        // Food - Groceries
        { budgetItem: groceriesItem._id, monthlyBudget: budget._id, amount: 72, name: "WinCo", date: new Date("2025-01-04") },
        { budgetItem: groceriesItem._id, monthlyBudget: budget._id, amount: 22, name: "WinCo", date: new Date("2025-01-09") },
        { budgetItem: groceriesItem._id, monthlyBudget: budget._id, amount: 85.72, name: "WinCo", date: new Date("2025-01-14") },
        { budgetItem: groceriesItem._id, monthlyBudget: budget._id, amount: 68, name: "WinCo", date: new Date("2025-01-20") },
        { budgetItem: groceriesItem._id, monthlyBudget: budget._id, amount: 28.01, name: "Safeway", date: new Date("2025-01-27") },
        // Food - Eating Out
        { budgetItem: eatingOutItem._id, monthlyBudget: budget._id, amount: 12.52, name: "Tacos", date: new Date("2025-01-11") },
        { budgetItem: eatingOutItem._id, monthlyBudget: budget._id, amount: 14.59, name: "Five Guys", date: new Date("2025-01-18") },
        { budgetItem: eatingOutItem._id, monthlyBudget: budget._id, amount: 6.89, name: "Shake", date: new Date("2025-01-23") },
        { budgetItem: eatingOutItem._id, monthlyBudget: budget._id, amount: 6.89, name: "Shake", date: new Date("2025-01-25") },
        // Food - Coffee 
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", date: new Date("2025-01-02") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", date: new Date("2025-01-04") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", date: new Date("2025-01-07") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 6.89, name: "Cafe", date: new Date("2025-01-09") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", date: new Date("2025-01-11") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", date: new Date("2025-01-14") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", date: new Date("2025-01-16") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 6.89, name: "Cafe", date: new Date("2025-01-18") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", date: new Date("2025-01-21") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", date: new Date("2025-01-23") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", date: new Date("2025-01-25") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", date: new Date("2025-01-28") },
        // Personal Care
        { budgetItem: clothingItem._id, monthlyBudget: budget._id, amount: 25, name: "Target", date: new Date("2025-01-15") },
        { budgetItem: gymItem._id, monthlyBudget: budget._id, amount: 75, name: "Gym membership", date: new Date("2025-01-01") },
        { budgetItem: birthControlItem._id, monthlyBudget: budget._id, amount: 10, name: "Birth control", date: new Date("2025-01-12") },
        { budgetItem: adobeItem._id, monthlyBudget: budget._id, amount: 29.99, name: "Adobe", date: new Date("2025-01-06") },
        { budgetItem: netflixItem._id, monthlyBudget: budget._id, amount: 12.99, name: "Netflix", date: new Date("2025-01-06") },
        // Debt
        { budgetItem: studentLoanItem._id, monthlyBudget: budget._id, amount: 200, name: "Student loan payment", date: new Date("2025-01-15") },
    ]);

    return {
        authUser, user, budget,
        categories: { incomeCategory, homeCategory, utilitiesCategory, 
            transportationCategory, foodCategory, personalCareCategory, 
            debtCategory },
        items: { workItem, commissionsItem, rentItem, electricItem, 
            internetItem, laundryItem, phoneItem, carInsuranceItem, 
            gasItem, maintenanceItem, groceriesItem, eatingOutItem, 
            coffeeItem, clothingItem, gymItem, birthControlItem, 
            nailsItem, adobeItem, netflixItem, studentLoanItem },
        debt: { studentLoanDebt },
        logs,
    };
}

describe("Dashboard Queries", () => {
    // TEST MOCK SETUP
    // // categories
    test("gets all categories", async () => {
        await createTestDatabase();

        const response = await request(app).get("/api/category");
        expect(response.status).toBe(200);
        expect(response.body.categories).toHaveLength(7);
    });

    test("gets all categories by budget", async () => {
        const { budget } = await createTestDatabase();

        const response = await request(app).get(`/api/category/budget/${budget._id}`);
        expect(response.status).toBe(200);
        expect(response.body.categories).toHaveLength(7);
    });

    test("gets a single category by id", async () => {
        const { categories: { incomeCategory } } = await createTestDatabase();

        const response = await request(app).get(`/api/category/${incomeCategory._id}`);
        expect(response.status).toBe(200);
        expect(response.body.category._id).toBe(incomeCategory._id.toString());
        expect(response.body.category.name).toBe("Income");
    });


    test("gets all items by budget", async () => {
        const { budget } = await createTestDatabase();

        const response = await request(app).get(`/api/item/budget/${budget._id}`);
        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(20);
    });

    test("gets all items by category", async () => {
        const { categories: { foodCategory } } = await createTestDatabase();

        const response = await request(app).get(`/api/item/category/${foodCategory._id}`);
        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(3); // groceries, eating out, coffee
    });

    test("gets a single item by id", async () => {
        const { items: { groceriesItem } } = await createTestDatabase();

        const response = await request(app).get(`/api/item/${groceriesItem._id}`);
        expect(response.status).toBe(200);
        expect(response.body.item._id).toBe(groceriesItem._id.toString());
        expect(response.body.item.name).toBe("Groceries");
    });

    // // activity logs
    test("gets all activity logs by item", async () => {
        const { items: { coffeeItem } } = await createTestDatabase();
        const response = await request(app).get(`/api/activity/item/${coffeeItem._id}`);
        expect(response.status).toBe(200);
        expect(response.body.activityLogs).toHaveLength(12);
    });

    test("gets all activity logs by item - groceries", async () => {
        const { items: { groceriesItem } } = await createTestDatabase();

        const response = await request(app).get(`/api/activity/item/${groceriesItem._id}`);
        expect(response.status).toBe(200);
        expect(response.body.activityLogs).toHaveLength(5);
    });

    // // debt
    test("gets debt item by budget item", async () => {
        const { items: { studentLoanItem }, debt: { studentLoanDebt } } = await createTestDatabase();

        const response = await request(app).get(`/api/debt/item/${studentLoanItem._id}`);
        expect(response.status).toBe(200);
        expect(response.body.debtItem._id).toBe(studentLoanDebt._id.toString());
    });

    
});