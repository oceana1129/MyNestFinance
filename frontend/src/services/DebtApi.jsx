import { API_URL, authHeaders } from "./Api";

/**
 * get all debt items
 * @returns 
 */
export async function getAllDebtItems() {
    const response = await fetch(
        `${API_URL}/debt`,
        {
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch debt items.");
    }

    return response.json();
}

/**
 * get a debt item by id
 * @param {*} debtItemId 
 * @returns 
 */
export async function getDebtItem(debtItemId) {
    const response = await fetch(
        `${API_URL}/debt/${debtItemId}`,
        {
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch debt item.");
    }

    return response.json();
}

/**
 * get debt item by budget id
 * @param {*} budgetItemId 
 * @returns 
 */
export async function getDebtItemByBudget(budgetItemId) {
    const response = await fetch(
        `${API_URL}/debt/item/${budgetItemId}`,
        {
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch debt item.");
    }

    return response.json();
}

/**
 * create a debt item
 * @param {*} debtItemData 
 * @returns 
 */
export async function createDebtItem(debtItemData) {
    const response = await fetch(
        `${API_URL}/debt`,
        {
            method: "POST",
            headers: await authHeaders(true),
            body: JSON.stringify(debtItemData),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create debt item.");
    }

    return response.json();
}

/**
 * update debt item
 * @param {*} debtItemId 
 * @param {*} debtItemData 
 * @returns 
 */
export async function updateDebtItem(debtItemId, debtItemData) {
    const response = await fetch(
        `${API_URL}/debt/${debtItemId}`,
        {
            method: "PUT",
            headers: await authHeaders(true),
            body: JSON.stringify(debtItemData),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update debt item.");
    }

    return response.json();
}

/**
 * delete a debt item by id
 * @param {*} debtItemId 
 * @returns 
 */
export async function deleteDebtItem(debtItemId) {
    const response = await fetch(
        `${API_URL}/debt/${debtItemId}`,
        {
            method: "DELETE",
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete debt item.");
    }

    return response.json();
}

/**
 * delete a debt item by budget
 * @param {*} budgetItemId 
 * @returns 
 */
export async function deleteDebtItemByBudget(budgetItemId) {
    const response = await fetch(
        `${API_URL}/debt/item/${budgetItemId}`,
        {
            method: "DELETE",
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete debt item.");
    }

    return response.json();
}