// API for notification preferences (mock backend integration)

// Simulate a backend DB (in-memory for demo)
const userPreferencesDB = {};

/**
 * Get notification preferences for a user
 * @param {string|number} userId
 * @returns {Promise<Object>} resolves to preferences object
 */
export function getNotificationPreferences(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userPreferencesDB[userId] || {
        dueDateReminders: true,
        taskCompleted: true,
        newTaskAssigned: true,
      });
    }, 200); // Simulate network latency
  });
}

/**
 * Update notification preferences for a user
 * @param {string|number} userId
 * @param {Object} preferences
 * @returns {Promise<Object>} resolves to updated preferences
 */
export function updateNotificationPreferences(userId, preferences) {
  return new Promise((resolve) => {
    setTimeout(() => {
      userPreferencesDB[userId] = { ...preferences };
      resolve(userPreferencesDB[userId]);
    }, 200); // Simulate network latency
  });
}
