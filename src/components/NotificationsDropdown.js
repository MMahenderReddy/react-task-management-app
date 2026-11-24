import React, { useState, useEffect, useRef } from 'react';
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead
} from '../api/notifications';
import './NotificationsDropdown.css';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

const NotificationsDropdown = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef();

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

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkRead = id => {
    markNotificationRead(id).then(success => {
      if (success) {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
      }
    });
  };

  const handleMarkAll = () => {
    markAllNotificationsRead().then(() => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
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
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpen(o => !o); }}
      >
        F514{/* Unicode bell */}
      </span>
      {unreadCount > 0 && (
        <span className="unread-count-badge" aria-label={`${unreadCount} unread notifications`}>
          {unreadCount}
        </span>
      )}
      {open && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <button className="mark-all-btn" onClick={handleMarkAll}>
                Mark all as read
              </button>
            )}
          </div>
          {loading ? (
            <div className="empty-notifications">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="empty-notifications">No notifications</div>
          ) : (
            <ul className="notifications-list">
              {notifications.map(n => (
                <li
                  key={n.id}
                  className={`notification-item${n.read ? '' : ' unread'}`}
                >
                  <div className="notification-message">{n.message}</div>
                  <div>
                    <div className="notification-date">{formatDate(n.createdAt)}</div>
                    {!n.read && (
                      <button
                        className="mark-read-btn"
                        onClick={() => handleMarkRead(n.id)}
                      >
                        Mark as read
                      </button>
                    )}
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

export default NotificationsDropdown;
