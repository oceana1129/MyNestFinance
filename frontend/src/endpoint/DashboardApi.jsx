import { API_URL, authHeaders } from "./Api";

/**
 * Get the monthly dashboard summary.
 * @param {*} monthlyBudgetId
 * @returns
 */
export async function getMonthlyDashboardSummary(monthlyBudgetId) {
  const response = await fetch(
    `${API_URL}/dashboard/monthly/${monthlyBudgetId}`,
    {
      headers: await authHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch monthly dashboard summary.");
  }
  const data = response.json();
  return data;
}

/**
 * Get the category breakdown for a monthly budget.
 * @param {*} monthlyBudgetId
 * @returns
 */
export async function getCategoryBreakdown(monthlyBudgetId) {
  const response = await fetch(
    `${API_URL}/dashboard/monthly/${monthlyBudgetId}/categories`,
    {
      headers: await authHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category breakdown.");
  }

  return response.json();
}

/**
 * Get all activity for a monthly budget.
 * @param {*} monthlyBudgetId
 * @returns
 */
export async function getMonthlyActivity(monthlyBudgetId) {
  const response = await fetch(
    `${API_URL}/dashboard/monthly/${monthlyBudgetId}/activity`,
    {
      headers: await authHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch monthly activity.");
  }

  return response.json();
}

/**
 * Get dashboard summary for a category.
 * @param {*} categoryId
 * @returns
 */
export async function getCategorySummary(categoryId) {
  const response = await fetch(`${API_URL}/dashboard/category/${categoryId}`, {
    headers: await authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch category summary.");
  }

  return response.json();
}

/**
 * Get dashboard summary for an item.
 * @param {*} itemId
 * @returns
 */
export async function getItemSummary(itemId) {
  const response = await fetch(`${API_URL}/dashboard/item/${itemId}`, {
    headers: await authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch item summary.");
  }

  return response.json();
}
