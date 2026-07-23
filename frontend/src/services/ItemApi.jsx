import { API_URL, authHeaders } from "./Api";

/**
 * Get all items for a category.
 */
export async function getAllItems(categoryId) {
    const response = await fetch(
        `${API_URL}/item/category/${categoryId}`,
        {
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch items.");
    }

    return response.json();
}

/**
 * Get a single item.
 */
export async function getItem(itemId) {
    const response = await fetch(
        `${API_URL}/item/${itemId}`,
        {
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch item.");
    }

    return response.json();
}

/**
 * Create a new item.
 */
export async function createItem(itemData) {
    console.log(JSON.stringify(itemData))
    const response = await fetch(`${API_URL}/item`, {
        method: "POST",
        headers: await authHeaders(true),
        body: JSON.stringify(itemData),
    });

    if (!response.ok) {
        throw new Error("Failed to create item.");
    }

    return response.json();
}

/**
 * Update an existing item.
 */
export async function updateItem(itemId, itemData) {
    const response = await fetch(
        `${API_URL}/item/${itemId}`,
        {
            method: "PUT",
            headers: await authHeaders(true),
            body: JSON.stringify(itemData),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update item.");
    }

    return response.json();
}

/**
 * Delete an item.
 */
export async function deleteItem(itemId) {
    const response = await fetch(
        `${API_URL}/item/${itemId}`,
        {
            method: "DELETE",
            headers: await authHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete item.");
    }

    return response.json();
}

/**
 * Reorder items.
 */
export async function reorderItem(categoryId, itemOrder) {
    const response = await fetch(
        `${API_URL}/item/reorder`,
        {
            method: "PUT",
            headers: await authHeaders(),
            body: JSON.stringify({
                categoryId,
                itemOrder,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to reorder items.");
    }

    return response.json();
}