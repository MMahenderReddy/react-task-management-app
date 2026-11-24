// src/api/notifications.js
// Realistic backend-like API for notifications (in-memory mock with persistence)

let notifications = [];

// Try to load from localStorage for persistence across reloads (simulate DB)
const NOTIFICATIONS_KEY = 'notifications';
function loadNotifications() {
  const data = localStorage.getItem(NOTIFICATIONS_KEY);
  notifications = data ? JSON.parse(data) : [];
}
function saveNotifications() {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

loadNotifications();

/**
 * Get all notifications for a user (simulate authentication with userId)
 * @param {string} userId
 * @returns {Array}
 */
export function getNotifications(userId) {
  // In real backend, filter by userId
  return notifications.filter(n => n.userId === userId);
}

/**
 * Add a notification for a user
 * @param {string} userId
 * @param {Object} notification { title, message, ... }
 * @returns {Object} The created notification
 */
export function addNotification(userId, notification) {
  const notif = {
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    userId,
    title: notification.title,
    message: notification.message,
    createdAt: new Date().toISOString(),
    read: false,
    ...notification,
  };
  notifications.unshift(notif);
  saveNotifications();
  return notif;
}

/**
 * Mark a notification as read
 * @param {string} userId
 * @param {string} notificationId
 * @returns {boolean}
 */
export function markNotificationRead(userId, notificationId) {
  const idx = notifications.findIndex(n => n.userId === userId && n.id === notificationId);
  if (idx === -1) return false;
  notifications[idx].read = true;
  saveNotifications();
  return true;
}

/**
 * Mark all notifications as read for a user
 * @param {string} userId
 */
export function markAllNotificationsRead(userId) {
  let changed = false;
  notifications.forEach(n => {
    if (n.userId === userId && !n.read) {
      n.read = true;
      changed = true;
    }
  });
  if (changed) saveNotifications();
}

/**
 * Delete a notification
 * @param {string} userId
 * @param {string} notificationId
 * @returns {boolean}
 */
export function deleteNotification(userId, notificationId) {
  const origLen = notifications.length;
  notifications = notifications.filter(n => !(n.userId === userId && n.id === notificationId));
  if (notifications.length !== origLen) {
    saveNotifications();
    return true;
  }
  return false;
}

/**
 * For demo/testing: clear all notifications for a user
 */
export function clearNotifications(userId) {
  notifications = notifications.filter(n => n.userId !== userId);
  saveNotifications();
}
