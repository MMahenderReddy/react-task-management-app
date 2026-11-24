// Backend-like API for user notification preferences persistence
// Uses localStorage for demo purposes

const USER_PREFS_KEY = 'user_notification_preferences';

// Default notification preferences (all enabled)
const DEFAULT_PREFERENCES = {
  email: true,
  sms: true,
  push: true,
  inApp: true,
};

/**
 * Get all user notification preferences from localStorage.
 * @returns {Object} { [userId]: preferences }
 */
function getAllUserPreferences() {
  const data = localStorage.getItem(USER_PREFS_KEY);
  return data ? JSON.parse(data) : {};
}

/**
 * Get preferences for a specific user, defaulting to all enabled if not set.
 * @param {string|number} userId
 * @returns {Object} preferences
 */
export function getUserNotificationPreferences(userId) {
  const allPrefs = getAllUserPreferences();
  if (!allPrefs[userId]) {
    // Return default if not set
    return { ...DEFAULT_PREFERENCES };
  }
  return { ...DEFAULT_PREFERENCES, ...allPrefs[userId] };
}

/**
 * Persist preferences for a specific user.
 * @param {string|number} userId
 * @param {Object} preferences
 * @returns {Object} saved preferences
 */
export function setUserNotificationPreferences(userId, preferences) {
  const allPrefs = getAllUserPreferences();
  // Merge with defaults to ensure all keys exist
  const merged = { ...DEFAULT_PREFERENCES, ...preferences };
  allPrefs[userId] = merged;
  localStorage.setItem(USER_PREFS_KEY, JSON.stringify(allPrefs));
  return merged;
}

/**
 * Simulate PUT /api/users/:id/notification-preferences
 * @param {string|number} userId
 * @param {Object} preferences
 * @returns {Object} saved preferences
 */
export function putUserNotificationPreferences(userId, preferences) {
  return setUserNotificationPreferences(userId, preferences);
}
