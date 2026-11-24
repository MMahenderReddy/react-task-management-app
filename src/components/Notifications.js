import React, { useEffect, useRef, useState } from 'react';
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification
} from '../api/notifications';
import './Notifications.css';

function timeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff/60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)} hr ago`;
  if (diff < 604800) return `${Math.floor(diff/86400)}d ago`;
  return date.toLocaleDateString();
}

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetchNotifications().then(n => {
        setNotifications(n);
        setLoading(false);
      });
    }
  }, [open]);

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

  const handleMarkRead = notifId => {
    markNotificationRead(notifId).then(() => {
      setNotifications(notifications =>
        notifications.map(n => n.id === notifId ? { ...n, read: true } : n)
      );
    });
  };
  const handleMarkAllRead = () => {
    markAllNotificationsRead().then(() => {
      setNotifications(notifications =>
        notifications.map(n => ({ ...n, read: true }))
      );
    });
  };
  const handleDelete = notifId => {
    deleteNotification(notifId).then(() => {
      setNotifications(notifications =>
        notifications.filter(n => n.id !== notifId)
      );
    });
  };

  return (
    <div className="notifications-bell" ref={dropdownRef}>
      <span
        className="bell-icon"
        role="button"
        aria-label="Notifications"
        tabIndex={0}
        onClick={() => setOpen(o => !o)}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setOpen(o => !o)}
      >
        {/* Bell SVG */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6V11c0-3.07-1.63-5.64-5-6.32V4a1 1 0 10-2 0v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29A1 1 0 006 19h12a1 1 0 00.71-1.71L18 16z" fill="#1976d2"/>
        </svg>
      </span>
      {unreadCount > 0 && (
        <span className="unread-count" aria-label={`${unreadCount} unread notifications`}>
          {unreadCount}
        </span>
      )}
      {open && (
        <div className="notifications-dropdown">
          <div className="notifications-dropdown-header">
            <span className="title">Notifications</span>
            <button
              className="mark-all-btn"
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              aria-disabled={unreadCount === 0}
            >
              Mark all as read
            </button>
          </div>
          {loading ? (
            <div className="notifications-empty">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="notifications-empty">No notifications</div>
          ) : (
            <ul className="notifications-list">
              {notifications.map(n => (
                <li
                  key={n.id}
                  className={`notification-item${n.read ? '' : ' unread'}`}
                >
                  <div className="notification-content">
                    <div className="notification-title">{n.title}</div>
                    <div className="notification-body">{n.body}</div>
                    <div className="notification-meta">{timeAgo(n.createdAt)}</div>
                  </div>
                  <div className="notification-actions">
                    {!n.read && (
                      <button onClick={() => handleMarkRead(n.id)} title="Mark as read">
                        Mark as read
                      </button>
                    )}
                    <button onClick={() => handleDelete(n.id)} title="Delete notification">
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
