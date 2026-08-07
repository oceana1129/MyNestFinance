import { API_URL, authHeaders } from "./Api";

/**
 * create an activity log
 * @param {*} activityLog 
 * @returns 
 */
export async function createActivityLog(activityLog) {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(activityLog),
  });

  if (!response.ok) {
    throw new Error("Failed to create activity log.");
  }

  return response.json();
}

/**
 * get all activity logs (for development)
 * @returns
 */
export async function getAllActivityLogs() {
  const response = await fetch(`${API_URL}`, {
    headers: await authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to load activity logs.");
  }

  return response.json();
}

/**
 * get an activity log
 * @param {*} id 
 * @returns 
 */
export async function getActivityLog(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: await authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to load activity log.");
  }

  return response.json();
}

/**
 * Get all activity logs by a budget
 * @param {*} budgetItemId 
 * @returns 
 */
export async function getActivityLogsByBudget(budgetItemId) {
  const response = await fetch(
    `${API_URL}/item/${budgetItemId}`,
    {
      headers: await authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load activity logs.");
  }

  return response.json();
}

/**
 * Update an activity log
 * @param {*} id activity log id
 * @param {*} activityLog activity log update information
 * @returns 
 */
export async function updateActivityLog(id, activityLog) {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",
      headers: await authHeaders(),
      body: JSON.stringify(activityLog),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update activity log.");
  }

  return response.json();
}

/**
 * delete an activity log
 * @param {*} id 
 * @returns 
 */
export async function deleteActivityLog(id) {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
      headers: await authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete activity log.");
  }

  return response.json();
}