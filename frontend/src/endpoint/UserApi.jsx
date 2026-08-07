import { auth } from "../firebase";

import { API_URL } from "./Api";

/**
 * Returns the current Firebase auth token.
 */
async function getToken() {
  if (!auth.currentUser) {
    throw new Error("No user is currently signed in.");
  }

  return await auth.currentUser.getIdToken();
}

/**
 * Sync Firebase user with backend database.
 */
export async function syncUser(firebaseUser) {
  const token = await firebaseUser.getIdToken();

  const response = await fetch(`${API_URL}/auth/sync`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to sync user.");
  }

  return response.json();
}

/**
 * Delete the current user.
 */
export async function deleteAccount() {
  const token = await getToken();

  const response = await fetch(`${API_URL}/auth/me`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete account.");
  }
}

/**
 * Update user settings.
 */
export async function updateSettings(settings) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/user/me/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(settings),
  });

  if (!response.ok) {
    throw new Error("Failed to update settings.");
  }

  return response.json();
}

/**
 * Update onboarding information.
 */
export async function updateOnboarding(onboarding) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/user/me/onboarding`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(onboarding),
  });

  if (!response.ok) {
    throw new Error("Failed to update onboarding.");
  }
  return response.json();
}

/**
 * Update display name.
 */
export async function updateDisplayName(nameChange) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/user/me/name`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nameChange),
  });

  if (!response.ok) {
    throw new Error("Failed to update name.");
  }
  return response.json();
}

/**
 * Get display name.
 */
export async function getDisplayName() {
  const token = await getToken();

  const response = await fetch(`${API_URL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch name");
  }

  const data = await response.json();

  return data.user.displayName;
}

/**
 * Get display name.
 */
export async function getUserSettings() {
  const token = await getToken();

  const response = await fetch(`${API_URL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch name");
  }

  const data = await response.json();

  return data.user.settings;
}

/**
 * Get display name.
 */
export async function getCurrentUser() {
  const token = await getToken();

  const response = await fetch(`${API_URL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch name");
  }

  const data = await response.json();

  return data.user;
}