import request from "supertest"

import app from "../src/testApp.js"

import AuthUser from "../src/models/AuthUser.js"
import User from "../src/models/UserProfile.js"
import MonthlyBudget from "../src/models/MonthlyBudget.js"
import BudgetCategory from "../src/models/BudgetCategory.js"
import BudgetItem from "../src/models/BudgetItem.js"
import BudgetActivityLog from "../src/models/BudgetActivityLog.js"
import BudgetDebtItem from "../src/models/BudgetDebtItem.js"

import {
    getMonthlyTotalIncome,
    getMonthlyTotalExpenses,
    getMonthlyTotalPayments,
    getMonthlyTotalRemaining,
    getMonthlyDashboardSummary,
    getCategoryBreakdown,
    getTotalCategoryPlanned,
    getTotalCategoryActual,
    getTotalCategoryDifference,
    getTotalItemActual,
    getTotalItemDifference,
    getMonthlyActivity,
    getMonthlyActivitiesByRange,
} from "../src/services/budgetQueryService.js";

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
        color: "purple",
        categoryType: "income",
    });

    const homeCategory = await BudgetCategory.create({
        monthlyBudget: budget._id,
        displayOrder: 1,
        name: "Home",
        emoji: "house",
        color: "purple",
        categoryType: "expense",
    });

    const utilitiesCategory = await BudgetCategory.create({
        monthlyBudget: budget._id,
        displayOrder: 2,
        name: "Utilities",
        emoji: "electric-plug",
        color: "purple",
        categoryType: "expense",
    });

    const transportationCategory = await BudgetCategory.create({
        monthlyBudget: budget._id,
        displayOrder: 3,
        name: "Transportation",
        emoji: "car",
        color: "purple",
        categoryType: "expense",
    });

    const foodCategory = await BudgetCategory.create({
        monthlyBudget: budget._id,
        displayOrder: 4,
        name: "Food",
        emoji: "fork-and-knife",
        color: "purple",
        categoryType: "expense",
    });

    const personalCareCategory = await BudgetCategory.create({
        monthlyBudget: budget._id,
        displayOrder: 5,
        name: "Personal Care",
        emoji: "sparkles",
        color: "purple",
        categoryType: "expense",
    });

    const debtCategory = await BudgetCategory.create({
        monthlyBudget: budget._id,
        displayOrder: 6,
        name: "Debt",
        emoji: "credit-card",
        color: "purple",
        categoryType: "debt",
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
        { budgetItem: workItem._id, monthlyBudget: budget._id, amount: 1400.22, name: "Paycheck 1", activityDate: new Date("2025-01-03") },
        { budgetItem: workItem._id, monthlyBudget: budget._id, amount: 1560.47, name: "Paycheck 2", activityDate: new Date("2025-01-17") },
        { budgetItem: commissionsItem._id, monthlyBudget: budget._id, amount: 95, name: "Full body", activityDate: new Date("2025-01-10") },
        { budgetItem: commissionsItem._id, monthlyBudget: budget._id, amount: 35, name: "Emotes", activityDate: new Date("2025-01-18") },
        { budgetItem: commissionsItem._id, monthlyBudget: budget._id, amount: 60, name: "Emotes", activityDate: new Date("2025-01-24") },
        // Home
        { budgetItem: rentItem._id, monthlyBudget: budget._id, amount: 1220, name: "Rent", activityDate: new Date("2025-01-01") },
        // Utilities
        { budgetItem: electricItem._id, monthlyBudget: budget._id, amount: 82, name: "Electric bill", activityDate: new Date("2025-01-08") },
        { budgetItem: internetItem._id, monthlyBudget: budget._id, amount: 66, name: "Internet", activityDate: new Date("2025-01-08") },
        { budgetItem: laundryItem._id, monthlyBudget: budget._id, amount: 25, name: "Laundry", activityDate: new Date("2025-01-13") },
        { budgetItem: phoneItem._id, monthlyBudget: budget._id, amount: 55, name: "Phone bill", activityDate: new Date("2025-01-10") },
        // Transportation
        { budgetItem: carInsuranceItem._id, monthlyBudget: budget._id, amount: 125, name: "Car insurance", activityDate: new Date("2025-01-05") },
        { budgetItem: gasItem._id, monthlyBudget: budget._id, amount: 80, name: "Gas", activityDate: new Date("2025-01-07") },
        { budgetItem: gasItem._id, monthlyBudget: budget._id, amount: 60, name: "Gas", activityDate: new Date("2025-01-14") },
        { budgetItem: gasItem._id, monthlyBudget: budget._id, amount: 70, name: "Gas", activityDate: new Date("2025-01-22") },
        // Food - Groceries
        { budgetItem: groceriesItem._id, monthlyBudget: budget._id, amount: 72, name: "WinCo", activityDate: new Date("2025-01-04") },
        { budgetItem: groceriesItem._id, monthlyBudget: budget._id, amount: 22, name: "WinCo", activityDate: new Date("2025-01-09") },
        { budgetItem: groceriesItem._id, monthlyBudget: budget._id, amount: 85.72, name: "WinCo", activityDate: new Date("2025-01-14") },
        { budgetItem: groceriesItem._id, monthlyBudget: budget._id, amount: 68, name: "WinCo", activityDate: new Date("2025-01-20") },
        { budgetItem: groceriesItem._id, monthlyBudget: budget._id, amount: 28.01, name: "Safeway", activityDate: new Date("2025-01-27") },
        // Food - Eating Out
        { budgetItem: eatingOutItem._id, monthlyBudget: budget._id, amount: 12.52, name: "Tacos", activityDate: new Date("2025-01-11") },
        { budgetItem: eatingOutItem._id, monthlyBudget: budget._id, amount: 14.59, name: "Five Guys", activityDate: new Date("2025-01-18") },
        { budgetItem: eatingOutItem._id, monthlyBudget: budget._id, amount: 6.89, name: "Shake", activityDate: new Date("2025-01-23") },
        { budgetItem: eatingOutItem._id, monthlyBudget: budget._id, amount: 6.89, name: "Shake", activityDate: new Date("2025-01-25") },
        // Food - Coffee 
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", activityDate: new Date("2025-01-02") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", activityDate: new Date("2025-01-04") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", activityDate: new Date("2025-01-07") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 6.89, name: "Cafe", activityDate: new Date("2025-01-09") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", activityDate: new Date("2025-01-11") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", activityDate: new Date("2025-01-14") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", activityDate: new Date("2025-01-16") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 6.89, name: "Cafe", activityDate: new Date("2025-01-18") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", activityDate: new Date("2025-01-21") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", activityDate: new Date("2025-01-23") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", activityDate: new Date("2025-01-25") },
        { budgetItem: coffeeItem._id, monthlyBudget: budget._id, amount: 5.42, name: "Cafe", activityDate: new Date("2025-01-28") },
        // Personal Care
        { budgetItem: clothingItem._id, monthlyBudget: budget._id, amount: 25, name: "Target", activityDate: new Date("2025-01-15") },
        { budgetItem: gymItem._id, monthlyBudget: budget._id, amount: 75, name: "Gym membership", activityDate: new Date("2025-01-01") },
        { budgetItem: birthControlItem._id, monthlyBudget: budget._id, amount: 10, name: "Birth control", activityDate: new Date("2025-01-12") },
        { budgetItem: adobeItem._id, monthlyBudget: budget._id, amount: 29.99, name: "Adobe", activityDate: new Date("2025-01-06") },
        { budgetItem: netflixItem._id, monthlyBudget: budget._id, amount: 12.99, name: "Netflix", activityDate: new Date("2025-01-06") },
        // Debt
        { budgetItem: studentLoanItem._id, monthlyBudget: budget._id, amount: 200, name: "Student loan payment", activityDate: new Date("2025-01-15") },
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

    // // Test Dashboard Queries
    test("getMonthlyTotalIncome returns sum of all income logs", async () => {
        const { budget } = await createTestDatabase();

        const result = await getMonthlyTotalIncome(budget._id);
        // paycheck1(1400.22) + paycheck2(1560.47) + commission(95+35+60)
        expect(result).toBeCloseTo(3150.69, 2);
    });

    test("getMonthlyTotalExpenses returns sum of all expense logs", async () => {
        const { budget } = await createTestDatabase();

        const result = await getMonthlyTotalExpenses(budget._id);
        // all logs except income and debt categories
        expect(result).toBeGreaterThan(0);
    });

    test("getMonthlyTotalPayments returns sum of debt logs", async () => {
        const { budget } = await createTestDatabase();

        const result = await getMonthlyTotalPayments(budget._id);
        // student loan payment = 200
        expect(result).toBeCloseTo(200, 2);
    });

    test("getMonthlyTotalRemaining returns income minus expenses and payments", async () => {
        const { budget } = await createTestDatabase();

        const [income, expenses, payments, remaining] = await Promise.all([
            getMonthlyTotalIncome(budget._id),
            getMonthlyTotalExpenses(budget._id),
            getMonthlyTotalPayments(budget._id),
            getMonthlyTotalRemaining(budget._id),
        ]);

        expect(remaining).toBeCloseTo(income - (expenses + payments), 2);
    });

    test("getMonthlyTotalRemaining is positive (under budget)", async () => {
        const { budget } = await createTestDatabase();

        const result = await getMonthlyTotalRemaining(budget._id);
        expect(result).toBeGreaterThan(0);
    });

    test("getMonthlyDashboardSummary returns correct data", async () => {
        const { budget } = await createTestDatabase();

        const result = await getMonthlyDashboardSummary(budget._id);

        expect(result).toHaveProperty("actualIncome");
        expect(result).toHaveProperty("actualExpenses");
        expect(result).toHaveProperty("actualPayments");
        expect(result).toHaveProperty("actualRemaining");
        expect(result).toHaveProperty("plannedIncome");
        expect(result).toHaveProperty("plannedExpenses");
        expect(result).toHaveProperty("plannedPayments");
        expect(result).toHaveProperty("percentageUsedIncome");
        expect(result).toHaveProperty("percentageUsedExpenses");
        expect(result).toHaveProperty("percentageUsedPayments");
        expect(result).toHaveProperty("percentageUsedAllExpenses");
    });

    test("getMonthlyDashboardSummary actualRemaining equals income minus expenses and payments", async () => {
        const { budget } = await createTestDatabase();

        const result = await getMonthlyDashboardSummary(budget._id);

        expect(result.actualRemaining).toBeCloseTo(
            result.actualIncome - (result.actualExpenses + result.actualPayments), 2
        );
    });

    test("getMonthlyDashboardSummary income matches getMonthlyTotalIncome", async () => {
        const { budget } = await createTestDatabase();

        const [summary, income] = await Promise.all([
            getMonthlyDashboardSummary(budget._id),
            getMonthlyTotalIncome(budget._id),
        ]);

        expect(summary.actualIncome).toBeCloseTo(income, 2);
    });

    test("getMonthlyDashboardSummary planned totals match sum of item plannedAmounts", async () => {
        const { budget } = await createTestDatabase();

        const result = await getMonthlyDashboardSummary(budget._id);

        // income: work(2800) + commissions(100)
        expect(result.plannedIncome).toBeCloseTo(2900, 2);
        // expenses: home(1200) + utilities(221) + transportation(315) + food(480) + personal care(193)
        expect(result.plannedExpenses).toBeCloseTo(2409, 2);
        // debt: student loans(150)
        expect(result.plannedPayments).toBeCloseTo(150, 2);
    });

    test("getMonthlyDashboardSummary percentageUsed fields are calculated from actual vs planned", async () => {
        const { budget } = await createTestDatabase();

        const result = await getMonthlyDashboardSummary(budget._id);

        // actualIncome(3150.69) / plannedIncome(2900)
        expect(result.percentageUsedIncome).toBeCloseTo(108.64, 2);
        // actualExpenses(2320.58) / plannedExpenses(2409)
        expect(result.percentageUsedExpenses).toBeCloseTo(96.33, 2);
        // actualPayments(200) / plannedPayments(150)
        expect(result.percentageUsedPayments).toBeCloseTo(133.33, 2);
    });

    test("getCategoryBreakdown returns all 7 categories", async () => {
        const { budget } = await createTestDatabase();

        const result = await getCategoryBreakdown(budget._id);
        expect(result).toHaveLength(7);
    });

    test("getCategoryBreakdown returns correct shape per category", async () => {
        const { budget } = await createTestDatabase();

        const result = await getCategoryBreakdown(budget._id);
        const food = result.find((c) => c.name === "Food");

        expect(food).toBeDefined();
        expect(food).toHaveProperty("planned");
        expect(food).toHaveProperty("actual");
        expect(food).toHaveProperty("difference");
        expect(food).toHaveProperty("reaction");
        expect(food).toHaveProperty("isActive");
        expect(food).toHaveProperty("percentage");
        expect(food).toHaveProperty("itemCount");
        expect(food.itemCount).toBe(3); // groceries, eating out, coffee
    });

    test("getCategoryBreakdown food category actual matches logs", async () => {
        const { budget } = await createTestDatabase();

        const result = await getCategoryBreakdown(budget._id);
        const food = result.find((c) => c.name === "Food");

        // groceries(275.73) + eating out(40.89) + coffee(67.98)
        expect(food.actual).toBeCloseTo(384.60, 2);
    });

    test("getCategoryBreakdown categories are sorted by displayOrder", async () => {
        const { budget } = await createTestDatabase();

        const result = await getCategoryBreakdown(budget._id);
        const orders = result.map((c) => c.displayOrder);

        expect(orders).toEqual([...orders].sort((a, b) => a - b));
    });

    test("getTotalCategoryPlanned sums item plannedAmounts", async () => {
        const { categories: { foodCategory } } = await createTestDatabase();

        const result = await getTotalCategoryPlanned(foodCategory._id);
        // groceries(280) + eating out(100) + coffee(100)
        expect(result).toBeCloseTo(480, 2);
    });

    test("getTotalCategoryActual sums activity logs", async () => {
        const { categories: { homeCategory } } = await createTestDatabase();

        const result = await getTotalCategoryActual(homeCategory._id);
        // rent = 1220
        expect(result).toBeCloseTo(1220, 2);
    });

    test("getTotalCategoryDifference returns ahead for expense under budget", async () => {
        const { categories: { foodCategory } } = await createTestDatabase();

        const result = await getTotalCategoryDifference(foodCategory._id);

        expect(result).toHaveProperty("planned");
        expect(result).toHaveProperty("actual");
        expect(result).toHaveProperty("difference");
        expect(result).toHaveProperty("reaction");
        expect(result.reaction).toBe("ahead"); // spent less than planned
    });

    test("getTotalCategoryDifference returns behind for expense over budget", async () => {
        const { categories: { homeCategory } } = await createTestDatabase();

        // rent planned 1200, actual 1220 — over budget
        const result = await getTotalCategoryDifference(homeCategory._id);
        expect(result.reaction).toBe("behind");
    });

    test("getTotalItemActual sums logs for a single item", async () => {
        const { items: { gasItem } } = await createTestDatabase();

        const result = await getTotalItemActual(gasItem._id);
        // 80 + 60 + 70
        expect(result).toBeCloseTo(210, 2);
    });

    test("getTotalItemActual returns 0 for item with no logs", async () => {
        const { items: { maintenanceItem } } = await createTestDatabase();

        const result = await getTotalItemActual(maintenanceItem._id);
        expect(result).toBe(0);
    });

    test("getTotalItemDifference returns correct shape", async () => {
        const { items: { groceriesItem } } = await createTestDatabase();

        const result = await getTotalItemDifference(groceriesItem._id);

        expect(result).toHaveProperty("planned");
        expect(result).toHaveProperty("actual");
        expect(result).toHaveProperty("difference");
        expect(result).toHaveProperty("reaction");
        expect(result).toHaveProperty("isActive");
        expect(result).toHaveProperty("percentage");
    });

    test("getTotalItemDifference item with no logs is not active", async () => {
        const { items: { maintenanceItem } } = await createTestDatabase();

        const result = await getTotalItemDifference(maintenanceItem._id);
        expect(result.isActive).toBe(false);
        expect(result.reaction).toBe("ahead");
    });

    test("getTotalItemDifference item that is behind budget", async () => {
        const { items: { electricItem } } = await createTestDatabase();

        const result = await getTotalItemDifference(electricItem._id);
        expect(result.isActive).toBe(true);
        expect(result.reaction).toBe("behind");
    });

    test("getTotalItemDifference throws for unknown item", async () => {
        await expect(
            getTotalItemDifference("507f191e810c19729de860ea")
        ).rejects.toThrow("BudgetItem not found");
    });

    test("getMonthlyActivity returns all logs for the budget", async () => {
        const { budget } = await createTestDatabase();

        const result = await getMonthlyActivity(budget._id);
        expect(result).toHaveLength(41);
    });

    test("getMonthlyActivity populates budgetItem name and emoji", async () => {
        const { budget } = await createTestDatabase();

        const result = await getMonthlyActivity(budget._id);
        expect(result[0].budgetItem).toHaveProperty("name");
        expect(result[0].budgetItem).toHaveProperty("emoji");
    });

    test("getMonthlyActivitiesByRange returns logs within range", async () => {
        const { budget } = await createTestDatabase();

        const result = await getMonthlyActivitiesByRange(
            budget._id,
            new Date("2025-01-01"),
            new Date("2025-01-07")
        );

        // paycheck1, rent, car insurance, gas, winco, cafe x3, gym, adobe, netflix = 11
        expect(result).toHaveLength(11);
    });

    test("getMonthlyActivitiesByRange returns empty array for range with no logs", async () => {
        const { budget } = await createTestDatabase();

        const result = await getMonthlyActivitiesByRange(
            budget._id,
            new Date("2025-02-01"),
            new Date("2025-02-28")
        );

        expect(result).toHaveLength(0);
    });
});