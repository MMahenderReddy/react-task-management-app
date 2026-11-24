// API functions for notification preferences
// This simulates backend integration for notification preferences

const STORAGE_KEY = 'user_notification_preferences';

// Simulate a user id for demo purposes
const getCurrentUserId = () => {
  // In a real app, get this from auth/session
  return '1';
};

/**
 * Fetch notification preferences for a user from the backend (simulated).
 * @param {string} userId
 * @returns {Promise<Object>} preferences object
 */
export function getNotificationPreferences(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      const allPrefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      resolve(allPrefs[userId] || {});
    }, 350);
  });
}

/**
 * Save notification preferences for a user to the backend (simulated).
 * @param {string} userId
 * @param {Object} preferences
 * @returns {Promise<Object>} saved preferences
 */
export function saveNotificationPreferences(userId, preferences) {
  return new Promise(resolve => {
    setTimeout(() => {
      const allPrefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      allPrefs[userId] = preferences;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allPrefs));
      resolve(preferences);
    }, 350);
  });
}

export { getCurrentUserId };