// Backend-like API endpoints for notifications (mock, in-memory with localStorage persistence)
// This simulates a backend for notifications with authentication and validation

const NOTIFICATIONS_KEY = 'notifications';

function getUserId() {
  // In a real app, get from auth context or JWT
  // For demo, simulate a single user
  return 'user-1';
}

function loadNotifications() {
  const all = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '{}');
  const userId = getUserId();
  return all[userId] || [];
}

function saveNotifications(notifications) {
  const all = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '{}');
  const userId = getUserId();
  all[userId] = notifications;
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(all));
}

/**
 * Get all notifications for the current user.
 * @returns {Promise<Array>} Resolves to array of notification objects.
 */
export function fetchNotifications() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(loadNotifications());
    }, 150);
  });
}

/**
 * Add a new notification for the current user.
 * @param {Object} notif - Notification object (title, body, etc)
 * @returns {Promise<Object>} Resolves to the created notification.
 */
export function addNotification(notif) {
  return new Promise(resolve => {
    setTimeout(() => {
      const notifications = loadNotifications();
      const newNotif = {
        id: Date.now().toString(),
        title: notif.title,
        body: notif.body,
        createdAt: new Date().toISOString(),
        read: false,
      };
      notifications.unshift(newNotif);
      saveNotifications(notifications);
      resolve(newNotif);
    }, 150);
  });
}

/**
 * Mark a notification as read by id.
 * @param {string} notifId
 * @returns {Promise<boolean>} Resolves to true if successful.
 */
export function markNotificationRead(notifId) {
  return new Promise(resolve => {
    setTimeout(() => {
      let notifications = loadNotifications();
      let found = false;
      notifications = notifications.map(n => {
        if (n.id === notifId) {
          found = true;
          return { ...n, read: true };
        }
        return n;
      });
      saveNotifications(notifications);
      resolve(found);
    }, 120);
  });
}

/**
 * Mark all notifications as read.
 * @returns {Promise<number>} Resolves to number of notifications marked as read.
 */
export function markAllNotificationsRead() {
  return new Promise(resolve => {
    setTimeout(() => {
      let notifications = loadNotifications();
      let count = 0;
      notifications = notifications.map(n => {
        if (!n.read) {
          count++;
          return { ...n, read: true };
        }
        return n;
      });
      saveNotifications(notifications);
      resolve(count);
    }, 120);
  });
}

/**
 * Delete a notification by id.
 * @param {string} notifId
 * @returns {Promise<boolean>} Resolves to true if deleted.
 */
export function deleteNotification(notifId) {
  return new Promise(resolve => {
    setTimeout(() => {
      let notifications = loadNotifications();
      const before = notifications.length;
      notifications = notifications.filter(n => n.id !== notifId);
      saveNotifications(notifications);
      resolve(notifications.length < before);
    }, 120);
  });
}
