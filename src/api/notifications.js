// Backend-like API for notifications (mock, in-memory persistence)
// In a real app, this would be replaced with real backend API calls

let notifications = [
  // Example notification
  // {
  //   id: '1',
  //   message: 'Welcome to the app!',
  //   createdAt: '2024-06-01T10:00:00Z',
  //   read: false
  // }
];

function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 6);
}

/**
 * Get all notifications for the current user (mocked)
 * @returns {Promise<Array>} Array of notification objects
 */
export function fetchNotifications() {
  // Simulate async API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...notifications]);
    }, 200);
  });
}

/**
 * Mark a notification as read
 * @param {string} id
 * @returns {Promise<boolean>} True if updated
 */
export function markNotificationRead(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const idx = notifications.findIndex(n => n.id === id);
      if (idx !== -1) {
        notifications[idx].read = true;
        resolve(true);
      } else {
        resolve(false);
      }
    }, 150);
  });
}

/**
 * Mark all notifications as read
 * @returns {Promise<void>}
 */
export function markAllNotificationsRead() {
  return new Promise(resolve => {
    setTimeout(() => {
      notifications = notifications.map(n => ({ ...n, read: true }));
      resolve();
    }, 150);
  });
}

/**
 * Add a new notification (for demo/testing)
 * @param {Object} notif
 * @returns {Promise<Object>}
 */
export function addNotification(notif) {
  return new Promise(resolve => {
    setTimeout(() => {
      const newNotif = {
        id: generateId(),
        message: notif.message,
        createdAt: new Date().toISOString(),
        read: false,
      };
      notifications.unshift(newNotif);
      resolve(newNotif);
    }, 100);
  });
}

/**
 * For testing/demo: clear all notifications
 */
export function clearNotifications() {
  notifications = [];
}
