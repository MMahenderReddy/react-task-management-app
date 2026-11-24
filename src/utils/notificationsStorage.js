// Utility functions for in-app notification persistence using Local Storage

const NOTIFICATIONS_KEY = 'notifications';

/**
 * Retrieve all notifications from Local Storage.
 * @returns {Array} Array of notification objects.
 */
export function getNotifications() {
  const notifications = localStorage.getItem(NOTIFICATIONS_KEY);
  return notifications ? JSON.parse(notifications) : [];
}

/**
 * Save all notifications to Local Storage.
 * @param {Array} notifications - Array of notification objects to save.
 */
export function saveNotifications(notifications) {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

/**
 * Add a new notification to Local Storage.
 * @param {Object} notification - Notification object to add.
 * @returns {Object} The added notification (with id).
 */
export function addNotification(notification) {
  const notifications = getNotifications();
  // Assign a unique id if not present
  if (!notification.id) {
    notification.id = Date.now().toString();
  }
  notification.read = false;
  notification.createdAt = notification.createdAt || new Date().toISOString();
  notifications.push(notification);
  saveNotifications(notifications);
  return notification;
}

/**
 * Mark a notification as read by id.
 * @param {string} notificationId - The id of the notification to mark as read.
 * @returns {boolean} True if update was successful, false otherwise.
 */
export function markNotificationAsRead(notificationId) {
  const notifications = getNotifications();
  const idx = notifications.findIndex(n => n.id === notificationId);
  if (idx === -1) return false;
  notifications[idx].read = true;
  saveNotifications(notifications);
  return true;
}

/**
 * Mark all notifications as read.
 */
export function markAllNotificationsAsRead() {
  const notifications = getNotifications();
  notifications.forEach(n => { n.read = true; });
  saveNotifications(notifications);
}

/**
 * Get count of unread notifications.
 * @returns {number}
 */
export function getUnreadNotificationsCount() {
  const notifications = getNotifications();
  return notifications.filter(n => !n.read).length;
}

/**
 * Update a notification (by id).
 * @param {Object} updatedNotification
 * @returns {boolean} True if update was successful, false otherwise.
 */
export function updateNotification(updatedNotification) {
  const notifications = getNotifications();
  const idx = notifications.findIndex(n => n.id === updatedNotification.id);
  if (idx === -1) return false;
  notifications[idx] = { ...notifications[idx], ...updatedNotification };
  saveNotifications(notifications);
  return true;
}

/**
 * Delete a notification by id.
 * @param {string} notificationId
 * @returns {boolean}
 */
export function deleteNotification(notificationId) {
  const notifications = getNotifications();
  const newNotifications = notifications.filter(n => n.id !== notificationId);
  if (newNotifications.length === notifications.length) return false;
  saveNotifications(newNotifications);
  return true;
}
