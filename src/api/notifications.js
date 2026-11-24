// Backend-like API endpoints for notifications (mock, in-memory with localStorage persistence)
// This simulates a RESTful API for notifications, with authentication stub

const NOTIFICATIONS_KEY = 'notifications';

// Simulate a logged-in user (in real app, get from auth context/session)
const CURRENT_USER_ID = 'user-1';

function getAllNotificationsFromStorage() {
  const data = localStorage.getItem(NOTIFICATIONS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveAllNotificationsToStorage(notifications) {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

/**
 * Get notifications for the current user (simulate authentication)
 * @returns {Array} Array of notification objects
 */
export function fetchNotifications() {
  const all = getAllNotificationsFromStorage();
  return all.filter(n => n.userId === CURRENT_USER_ID);
}

/**
 * Add a notification for the current user
 * @param {Object} notification - { message, type }
 * @returns {Object} The created notification
 */
export function createNotification(notification) {
  const all = getAllNotificationsFromStorage();
  const newNotif = {
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    userId: CURRENT_USER_ID,
    message: notification.message,
    type: notification.type || 'info',
    createdAt: new Date().toISOString(),
    read: false,
  };
  all.push(newNotif);
  saveAllNotificationsToStorage(all);
  return newNotif;
}

/**
 * Mark a notification as read (by id)
 * @param {string} notificationId
 * @returns {boolean} true if updated
 */
export function markNotificationAsRead(notificationId) {
  const all = getAllNotificationsFromStorage();
  const idx = all.findIndex(n => n.id === notificationId && n.userId === CURRENT_USER_ID);
  if (idx === -1) return false;
  all[idx].read = true;
  saveAllNotificationsToStorage(all);
  return true;
}

/**
 * Mark all notifications as read for current user
 */
export function markAllNotificationsAsRead() {
  const all = getAllNotificationsFromStorage();
  let changed = false;
  for (let n of all) {
    if (n.userId === CURRENT_USER_ID && !n.read) {
      n.read = true;
      changed = true;
    }
  }
  if (changed) saveAllNotificationsToStorage(all);
}

/**
 * Delete a notification (for current user)
 */
export function deleteNotification(notificationId) {
  const all = getAllNotificationsFromStorage();
  const filtered = all.filter(n => !(n.id === notificationId && n.userId === CURRENT_USER_ID));
  if (filtered.length !== all.length) {
    saveAllNotificationsToStorage(filtered);
    return true;
  }
  return false;
}
