// Persistent notifications API using Local Storage
// Provides CRUD operations for notifications

const NOTIFICATIONS_KEY = 'notifications';

/**
 * Get all notifications for the current user (demo: single user).
 * @returns {Array} Array of notification objects.
 */
export function getNotifications() {
  const data = localStorage.getItem(NOTIFICATIONS_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Save all notifications to Local Storage.
 * @param {Array} notifications
 */
function saveNotifications(notifications) {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

/**
 * Add a new notification.
 * @param {Object} notification - { id, message, read, createdAt }
 * @returns {Object} The added notification
 */
export function addNotification(notification) {
  const notifications = getNotifications();
  const newNotif = {
    ...notification,
    id: notification.id || Date.now().toString(),
    read: false,
    createdAt: notification.createdAt || new Date().toISOString(),
  };
  notifications.unshift(newNotif); // newest first
  saveNotifications(notifications);
  return newNotif;
}

/**
 * Mark a notification as read by id.
 * @param {string} id
 * @returns {boolean} True if updated
 */
export function markNotificationRead(id) {
  const notifications = getNotifications();
  const idx = notifications.findIndex(n => n.id === id);
  if (idx === -1) return false;
  notifications[idx].read = true;
  saveNotifications(notifications);
  return true;
}

/**
 * Mark all notifications as read.
 */
export function markAllNotificationsRead() {
  const notifications = getNotifications().map(n => ({ ...n, read: true }));
  saveNotifications(notifications);
}

/**
 * Delete a notification by id.
 * @param {string} id
 * @returns {boolean} True if deleted
 */
export function deleteNotification(id) {
  const notifications = getNotifications();
  const newNotifications = notifications.filter(n => n.id !== id);
  if (newNotifications.length === notifications.length) return false;
  saveNotifications(newNotifications);
  return true;
}

/**
 * Get count of unread notifications.
 * @returns {number}
 */
export function getUnreadCount() {
  return getNotifications().filter(n => !n.read).length;
}
