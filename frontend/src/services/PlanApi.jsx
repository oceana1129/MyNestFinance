import { API_URL, authHeaders } from "./Api";

/**
 * get all plan items
 * @returns 
 */
export async function getAllPlanItems() {
    const response = await fetch(
        `${API_URL}/plan`,
        {
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch plan items.");
    }

    return response.json();
}

/**
 * get a plan item by id
 * @param {*} planItemId 
 * @returns 
 */
export async function getPlanItem(planItemId) {
    const response = await fetch(
        `${API_URL}/plan/${planItemId}`,
        {
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch plan item.");
    }

    return response.json();
}

/**
 * get plan item by budget id
 * @param {*} budgetItemId 
 * @returns 
 */
export async function getPlanItemByBudget(budgetItemId) {
    const response = await fetch(
        `${API_URL}/plan/item/${budgetItemId}`,
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
 * create a plan item
 * @param {*} planItemData 
 * @returns 
 */
export async function createPlanItem(planItemData) {
    const response = await fetch(
        `${API_URL}/plan`,
        {
            method: "POST",
            headers: await authHeaders(true),
            body: JSON.stringify(planItemData),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create plan item.");
    }

    return response.json();
}

/**
 * update plan item
 * @param {*} planItemId 
 * @param {*} planItemData 
 * @returns 
 */
export async function updatePlanItem(planItemId, planItemData) {
    const response = await fetch(
        `${API_URL}/plan/${planItemId}`,
        {
            method: "PUT",
            headers: await authHeaders(true),
            body: JSON.stringify(planItemData),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update plan item.");
    }

    return response.json();
}

/**
 * delete a plan item by id
 * @param {*} planItemId 
 * @returns 
 */
export async function deletePlanItem(planItemId) {
    const response = await fetch(
        `${API_URL}/plan/${planItemId}`,
        {
            method: "DELETE",
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete plan item.");
    }

    return response.json();
}

/**
 * delete a plan item by budget
 * @param {*} budgetItemId 
 * @returns 
 */
export async function deletePlanItemByBudget(budgetItemId) {
    const response = await fetch(
        `${API_URL}/plan/item/${budgetItemId}`,
        {
            method: "DELETE",
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete plan item.");
    }

    return response.json();
}