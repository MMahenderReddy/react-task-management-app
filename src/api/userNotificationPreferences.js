// Real backend integration for user notification preferences
// This module provides functions to persist user notification preferences
// via a real backend API (PUT /api/users/:id/notification-preferences)

/**
 * Update user notification preferences via backend API.
 * @param {string|number} userId - The user's id.
 * @param {object} preferences - The notification preferences object.
 * @returns {Promise<object>} Resolves to the updated preferences from backend.
 * @throws {Error} If the request fails.
 */
export async function updateUserNotificationPreferences(userId, preferences) {
  if (!userId) throw new Error('User ID is required');
  const response = await fetch(`/api/users/${userId}/notification-preferences`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preferences),
    credentials: 'include', // send cookies if needed
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update preferences: ${response.status} ${errorText}`);
  }
  return response.json();
}

/**
 * Fetch user notification preferences from backend API.
 * @param {string|number} userId - The user's id.
 * @returns {Promise<object>} Resolves to the preferences object.
 * @throws {Error} If the request fails.
 */
export async function getUserNotificationPreferences(userId) {
  if (!userId) throw new Error('User ID is required');
  const response = await fetch(`/api/users/${userId}/notification-preferences`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch preferences: ${response.status} ${errorText}`);
  }
  return response.json();
}
