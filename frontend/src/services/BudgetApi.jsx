import { API_URL, authHeaders } from "./Api";

/**
 * Get all monthly budgets.
 */
export async function getBudgets() {
    const response = await fetch(`${API_URL}/budget`, {
        headers: await authHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch budgets.");
    }

    return response.json();
}

/**
 * Get a monthly budget by ID.
 */
export async function getBudget(budgetId) {
    const response = await fetch(`${API_URL}/budget/${budgetId}`, {
        headers: await authHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch budget.");
    }

    return response.json();
}

/**
 * Get all budgets for a specific user.
 */
export async function getUserBudgets(userId) {
    const response = await fetch(`${API_URL}/budget/user/${userId}`, {
        headers: await authHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user budgets.");
    }

    return response.json();
}

/**
 * Create a monthly budget.
 */
export async function createBudget(budgetData) {
    console.log(JSON.stringify(budgetData))
    const response = await fetch(`${API_URL}/budget`, {
        method: "POST",
        headers: await authHeaders(true),
        body: JSON.stringify(budgetData),
    });

    if (!response.ok) {
        throw new Error("Failed to create budget.");
    }

    return response.json();
}

/**
 * Update a monthly budget.
 */
export async function updateBudget(budgetId, budgetData) {
    const response = await fetch(`${API_URL}/budget/${budgetId}`, {
        method: "PUT",
        headers: await authHeaders(true),
        body: JSON.stringify(budgetData),
    });

    if (!response.ok) {
        throw new Error("Failed to update budget.");
    }

    return response.json();
}

/**
 * Delete a monthly budget.
 */
export async function deleteBudget(budgetId) {
    const response = await fetch(`${API_URL}/budget/${budgetId}`, {
        method: "DELETE",
        headers: await authHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to delete budget.");
    }

    return response.json();
}

/**
 * Delete all budgets for a user.
 */
export async function deleteUserBudgets(userId) {
    const response = await fetch(`${API_URL}/budget/user/${userId}`, {
        method: "DELETE",
        headers: await authHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to delete user budgets.");
    }

    return response.json();
}