import React, { useEffect, useRef, useState } from 'react';
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from '../api/notifications';
import './Notifications.css';

// For demo: use a hardcoded userId
const DEMO_USER_ID = 'user-001';

function formatTimeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // seconds
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString();
}

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  // Fetch notifications
  const fetchNotifications = () => {
    setNotifications(getNotifications(DEMO_USER_ID));
  };

  useEffect(() => {
    fetchNotifications();
    // Optionally, poll for new notifications every N seconds
    // const interval = setInterval(fetchNotifications, 10000);
    // return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleBellClick = () => {
    setOpen(o => !o);
    if (!open) fetchNotifications();
  };

  const handleMarkRead = notifId => {
    markNotificationRead(DEMO_USER_ID, notifId);
    fetchNotifications();
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead(DEMO_USER_ID);
    fetchNotifications();
  };

  const handleDelete = notifId => {
    deleteNotification(DEMO_USER_ID, notifId);
    fetchNotifications();
  };

  return (
    <div className="notifications-bell" ref={dropdownRef}>
      <span
        className="bell-icon"
        role="button"
        aria-label="Notifications"
        tabIndex={0}
        onClick={handleBellClick}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleBellClick()}
      >
        {/* Bell SVG */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      </span>
      {unreadCount > 0 && (
        <span className="notifications-count" aria-label={`${unreadCount} unread notifications`}>
          {unreadCount}
        </span>
      )}
      {open && (
        <div className="notifications-dropdown">
          <div className="notifications-dropdown-header">
            Notifications
            {unreadCount > 0 && (
              <button className="notifications-mark-all-btn" onClick={handleMarkAllRead}>
                Mark all as read
              </button>
            )}
          </div>
          {notifications.length === 0 ? (
            <div className="notifications-empty">No notifications</div>
          ) : (
            <ul className="notifications-dropdown-list">
              {notifications.map(n => (
                <li
                  key={n.id}
                  className={
                    'notifications-dropdown-item' + (n.read ? '' : ' unread')
                  }
                >
                  <div className="notifications-title">{n.title}</div>
                  <div className="notifications-message">{n.message}</div>
                  <div className="notifications-time">{formatTimeAgo(n.createdAt)}</div>
                  <div className="notifications-actions">
                    {!n.read && (
                      <button
                        className="notifications-action-btn"
                        onClick={() => handleMarkRead(n.id)}
                      >
                        Mark as read
                      </button>
                    )}
                    <button
                      className="notifications-action-btn"
                      onClick={() => handleDelete(n.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
