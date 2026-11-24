// Backend-like API for in-app notifications and unread tracking
// This is a mock implementation using in-memory data for demo purposes

let notifications = [
  // Example notification
  // {
  //   id: '1',
  //   userId: 'demo',
  //   message: 'Welcome to the app!',
  //   createdAt: '2024-06-10T10:00:00Z',
  //   read: false,
  //   type: 'info',
  // }
];

let notificationPreferences = {
  // userId: { inApp: true, email: false, push: false }
};

function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 6);
}

/**
 * Get notifications for a user (most recent first).
 * @param {string} userId
 * @returns {Array}
 */
export function getNotifications(userId) {
  return notifications
    .filter(n => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Add a new notification for a user.
 * @param {string} userId
 * @param {Object} notificationData - { message, type }
 * @returns {Object} The created notification
 */
export function addNotification(userId, notificationData) {
  const notif = {
    id: generateId(),
    userId,
    message: notificationData.message,
    type: notificationData.type || 'info',
    createdAt: new Date().toISOString(),
    read: false,
  };
  notifications.push(notif);
  return notif;
}

/**
 * Mark a notification as read.
 * @param {string} userId
 * @param {string} notificationId
 * @returns {boolean} True if updated, false otherwise
 */
export function markNotificationRead(userId, notificationId) {
  const notif = notifications.find(n => n.userId === userId && n.id === notificationId);
  if (!notif) return false;
  notif.read = true;
  return true;
}

/**
 * Mark all notifications as read for a user.
 * @param {string} userId
 */
export function markAllNotificationsRead(userId) {
  notifications.forEach(n => {
    if (n.userId === userId) n.read = true;
  });
}

/**
 * Get count of unread notifications for a user.
 * @param {string} userId
 * @returns {number}
 */
export function getUnreadCount(userId) {
  return notifications.filter(n => n.userId === userId && !n.read).length;
}

/**
 * Get notification preferences for a user.
 * @param {string} userId
 * @returns {Object}
 */
export function getNotificationPreferences(userId) {
  return notificationPreferences[userId] || { inApp: true, email: false, push: false };
}

/**
 * Update notification preferences for a user.
 * @param {string} userId
 * @param {Object} prefs - { inApp, email, push }
 * @returns {Object} Updated preferences
 */
export function setNotificationPreferences(userId, prefs) {
  notificationPreferences[userId] = {
    ...getNotificationPreferences(userId),
    ...prefs,
  };
  return notificationPreferences[userId];
}
