import { API_URL, authHeaders } from "./Api";

/**
 * Get all categories for a monthly budget.
 */
export async function getAllCategories(monthlyBudgetId) {
    const response = await fetch(
        `${API_URL}/category/budget/${monthlyBudgetId}`,
        {
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch categories.");
    }

    return response.json();
}

/**
 * Get a single category.
 */
export async function getCategory(categoryId) {
    const response = await fetch(
        `${API_URL}/category/${categoryId}`,
        {
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch category.");
    }

    return response.json();
}

/**
 * Get all categories under a budget
 */
export async function getCategoryByBudget(budgetId) {
    const response = await fetch(
        `${API_URL}/category/budget/${budgetId}`,
        {
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch category.");
    }

    return response.json();
}

/**
 * Create a new category.
 */
export async function createCategory(categoryData) {
    console.log(JSON.stringify(categoryData))
    const response = await fetch(`${API_URL}/category`, {
        method: "POST",
        headers: await authHeaders(true),
        body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
        throw new Error("Failed to create category.");
    }

    return response.json();
}

/**
 * Update an existing category.
 */
export async function updateCategory(categoryId, categoryData) {
    const response = await fetch(
        `${API_URL}/category/${categoryId}`,
        {
            method: "PUT",
            headers: await authHeaders(true),
            body: JSON.stringify(categoryData),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update category.");
    }

    return response.json();
}

/**
 * Delete a category.
 */
export async function deleteCategory(categoryId) {
    const response = await fetch(
        `${API_URL}/category/${categoryId}`,
        {
            method: "DELETE",
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete category.");
    }

    return response.json();
}

/**
 * Reorder categories.
 */
export async function reorderCategories(monthlyBudgetId, categoryOrder) {
    const response = await fetch(
        `${API_URL}/category/reorder`,
        {
            method: "PUT",
            headers: await authHeaders(),
            body: JSON.stringify({
                monthlyBudgetId,
                categoryOrder,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to reorder categories.");
    }

    return response.json();
}