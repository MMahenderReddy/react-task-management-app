// Realistic backend-like API for notifications
// In-memory mock with simulated HTTP and persistence

let notifications = [
  // Example notification
  {
    id: '1',
    message: 'Welcome to the Task Dashboard!',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: false,
  },
];

// Simulate persistence (in-memory for now)
function persist() {
  // In a real app, this would persist to a DB
}

function generateId() {
  return Date.now().toString() + Math.random().toString(36).slice(2, 8);
}

/**
 * Get all notifications for the current user (mocked)
 * @returns {Promise<Array>}
 */
export function fetchNotifications() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...notifications]);
    }, 150);
  });
}

/**
 * Mark a notification as read
 * @param {string} id
 * @returns {Promise<boolean>}
 */
export function markNotificationRead(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const idx = notifications.findIndex(n => n.id === id);
      if (idx !== -1) {
        notifications[idx].read = true;
        persist();
        resolve(true);
      } else {
        resolve(false);
      }
    }, 100);
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
      persist();
      resolve();
    }, 120);
  });
}

/**
 * Delete a notification
 * @param {string} id
 * @returns {Promise<boolean>}
 */
export function deleteNotification(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const prevLen = notifications.length;
      notifications = notifications.filter(n => n.id !== id);
      persist();
      resolve(notifications.length < prevLen);
    }, 100);
  });
}

/**
 * Add a new notification
 * @param {string} message
 * @returns {Promise<Object>}
 */
export function addNotification(message) {
  return new Promise(resolve => {
    setTimeout(() => {
      const notif = {
        id: generateId(),
        message,
        createdAt: new Date().toISOString(),
        read: false,
      };
      notifications.unshift(notif);
      persist();
      resolve(notif);
    }, 80);
  });
}
